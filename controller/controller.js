const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scrap-n-save', { useNewUrlParser: true });
const db = require('../models');
const scrapeAppleInsider = require('../utilities/scrapeAI')

router.get('/', (req, res) => {
  db.Article
    .find({ saved: false })
    .then(dbArticles => res.render('index', {articles: dbArticles}))
    .catch(err => console.log(err))
});

router.get('/saved', (req, res) => {
  db.Article
    .find({ saved: true })
    .then(function (dbArticles) {
      res.render('index', { articles: dbArticles });
    })
    .catch(err => console.log(err));
});

router.get('/scrape', function (req, res) {
  scrapeAppleInsider(articles =>
    db.Article
      .create(articles)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))  
  )
});

router.get('/clear', (req, res) => {
  db.Article
    .deleteMany({ saved: false })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.put('/api/article/save', function (req, res) {
  db.Article
    .updateOne({_id: req.body.id}, {$set: {saved: true}})
    .then(() => res.redirect(200,'/') )
    .catch(err => console.log('Can"n update', err)) 
})

router.put('/api/article/remove', function (req, res) {
  db.Article
    .updateOne({_id: req.body.id}, {$set: {saved: false}})
    .then(() => res.redirect(200,'/'))
    .catch(err => console.log('Can"n update', err)) 
})

router.get('/api/notes/:id', function (req, res) {
  console.log('Got request for Notes', req.params.id);
  res.json({ message: 'Ok' });
  db.Note
  //   .updateOne({_id: req.body.id}, {$set: {saved: false}})
  //   .then(() => res.redirect(200,'/'))
  //   .catch(err => console.log('Can"n update', err)) 



})

router.post("/api/notes", (req, res) => {
  console.log(req.body);
  db.Note.create(req.body)
    .then(dbNote => {
      return db.Article.findOneAndUpdate({_id: req.body.articleId}, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
});

module.exports = router;
    