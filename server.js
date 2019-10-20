const express = require('express');
//const mongojs = require("mongojs"); //TEMP
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controller/controller');

app.use(routes);

// Database configuration TEMP
//var databaseUrl = "scraper";              
//var collections = ["scrapedData"];
//var db = mongojs(databaseUrl, collections);
//db.on("error", function(error) {
//  console.log("Database Error:", error);
//});

// Database configuration TEMP

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});

// app.get("/scrape", function (req, res) {
//   axios.get("https://appleinsider.com").then(function (response) {
//     const $ = cheerio.load(response.data);

//     $(".post").each(function (i, element) {
//       db.scrapedData.insert({
//         title: $(element).find("h1 a").text(),
//         link: $(element).find("a").attr("href")
//       }, function (err) {
//         if (err)
//           res.send("Error").end();
//       });
//     });
//     res.send("success");  
//   });
// });

// app.get("/display", function (req, res) {
//   db.scrapedData.find({}, function(err, data) {
//     if (err) {
//       console.log(err);
//       res.send("Error");
//     }
//     else
//       res.json(data);
//   });
// });
