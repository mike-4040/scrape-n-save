const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/', (req, res) => res.render('index'));

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
    res.json(articles[0]);
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
    