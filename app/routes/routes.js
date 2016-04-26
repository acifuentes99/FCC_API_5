//'use strict'

var request = require('request');
var multer = require('multer');
var upload = multer({ dest: './uploads/'});
var aux_ = '';
 
var path = process.cwd();
var Recentsearch = require('../models/search.js');


module.exports = function (app) {

    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        })
        .post(upload.single('file_'), function(req, res){
            //console.log(req.body); // form fields
            //console.log(req.file); // form files
            aux_ = req.file.size;
            //res.json(req.file.size); // form files
            res.render('ejs/index', {
                file_size: req.file.size,
            });
        });



    app.route('/api/:search')
    .get(function(req, res) {

        var data = {
          url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDEz7dYtuiKz0_BAwr_2EotVuyUznR2WYs&cx=009921780388225416917:eu1ziiam9wg&searchType=image&q='+req.params.search,
          headers: {
            'User-Agent': 'request'
          }
        };
        
        var newSearch = Recentsearch({
            term: req.params.search
        });
        newSearch.save(function(err){
            if(err) console.log(err);
        });

        request(data, function(error, response, body){
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                //console.log(info.stargazers_count + " Stars");
                //console.log(info.forks_count + " Forks");
                var items = [];
                info.items.forEach(function (item){
                   var aux = {
                    'url': item.link,
                    'snippet': item.snippet,
                    'thumbnail': item.image.thumbnailLink,
                    'context': item.image.contextLink
                   };
                   items.push(aux);
                });
                res.send(items);
          }
        });
    });


    app.get('/recent', function(req, res){
       Recentsearch.find({},{'_id': 0, "__v": 0},{sort: {when: -1}},function(err, doc){
            if(doc){
                res.send(doc);
            }
            else if(err) console.log(err);
            else{
                res.send("not data yet");
            }
       }); 

    });


};

            //start: 5,
            //fileType: "pdf",
            //gl: "tr", //geolocation, 


            //lr: "lang_tr",
            //num: 10, // Number of search results to return between 1 and 10, inclusive 
            //siteSearch: "http://kitaplar.ankara.edu.tr/" // Restricts results to URLs from a specified site 
