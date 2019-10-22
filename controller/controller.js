const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
//??
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scrap-n-save', { useNewUrlParser: true });
const db = require("../models");

router.get('/', (req, res) => {
  db.Article.find()
        .then(function(dbArticle) {
          res.render('index', {articles: dbArticle});
        })
        .catch(function(err) {
          console.log(err);
        });
});

router.get('/scrape', function (req, res) {
  axios.get('https://appleinsider.com').then(function (response) {
    const $ = cheerio.load(response.data);
    let articles = [];
    $(".post").each(function (i, element) {
      articles.push({
        title: $(element).find("h1 a").text(),
        link: $(element).find("a").attr("href"),
        image: $(element).find('.river-img-wrap img').attr('data-original'),
        description: $(element).find('.post-description').text()
      })
    });
    db.Article.create(articles)
        .then(function(dbArticle) {
          res.redirect(200, '/');
        })
        .catch(function(err) {
          console.log(err);
        });
  });
});

router.post('/api/burgers', (req, res) =>
  burger.create('burger_name', req.body.name, result => res.json({ id: result.insertId }))
);

router.put('/api/burgers/:id', (req, res) =>
  burger.update('devoured', req.body.devoured == 'true', req.params.id, result => {
    if (result.changedRows == 0) res.status(404).end();
    res.status(200).end();
  })
);

module.exports = router;
    