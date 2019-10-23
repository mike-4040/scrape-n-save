const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scrap-n-save', { useNewUrlParser: true });
const db = require("../models");
const scrapeAppleInsider = require('../utilities/scrapeAI')

router.get('/', (req, res) => {
  db.Article.find({saved: false})
        .then(function(dbArticle) {
          res.render('index', {articles: dbArticle});
        })
        .catch(function(err) {
          console.log(err);
        });
});

router.get('/scrape', function (req, res) {
  scrapeAppleInsider((articles) =>
    db.Article
      .create(articles)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))  
  )
});

router.put('/api/article', function (req, res) {
  db.Article
    .updateOne({_id: req.body.id}, {$set: {saved: true}})
    .then(() => { console.log('Saved'); res.redirect(200,'/') })
    .catch(err => console.log('Can"n update', err)) 
})

// router.post('/api/burgers', (req, res) =>
//   burger.create('burger_name', req.body.name, result => res.json({ id: result.insertId }))
// );

// router.put('/api/burgers/:id', (req, res) =>
//   burger.update('devoured', req.body.devoured == 'true', req.params.id, result => {
//     if (result.changedRows == 0) res.status(404).end();
//     res.status(200).end();
//   })
// );

module.exports = router;
    