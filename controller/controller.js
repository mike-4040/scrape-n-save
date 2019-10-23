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

router.put('/api/article', function (req, res) {
  db.Article
    .updateOne({_id: req.body.id}, {$set: {saved: true}})
    .then(() => { console.log('Saved'); res.redirect(200,'/') })
    .catch(err => console.log('Can"n update', err)) 
})

module.exports = router;
    