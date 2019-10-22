const axios = require('axios');
const cheerio = require('cheerio');
const source = 'https://appleinsider.com';

function scrapeAppleInsider(cb) {
  axios.get(source).then(function (response) {
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
    cb(articles);
  });
}
module.exports = scrapeAppleInsider;
