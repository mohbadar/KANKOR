var express = require("express");
// body-parser extract the entire body portion of an incoming request stream and exposes it on  req.body
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Result = require('./models/Result.js');
var app = express();

mongoose.connect('mongodb://localhost:27017/kankor')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  
mongoose.Promise = global.Promise;
mongoose.set('debug', true)

//configuring bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting server port
app.set('port', process.env.PORT || 3000);
// setting views folder address
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'public'));
app.use('/images', express.static(__dirname +'/public/images/'));
app.use('/js', express.static(__dirname +'/public/js/'));

// home page - HTTP GET request to /, the index.jade view is rendered
app.get('/', function(req, res) {
	res.sendFile(app.get('views') +'/index.html');
});

// home page - HTTP GET request to /results/:id, the json is returned
app.get('/results/:id', function(req, res, next) {
    Result.findOne({id: req.params.id},  function(err, result_data){
        console.log('into mongoose findone : '+ result_data);
        if (err) return res.status(200).send(err)
        if (result_data) {
            return res.status(200).send(result_data);
        } else {
            return res.status(200).send('آیدی نمبر دریافت نشد.');
            
        }
    });
});

var server = app.listen(app.get('port'), function () {
    console.log("app running on port.", server.address().port);
});