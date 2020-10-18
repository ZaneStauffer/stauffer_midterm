var express = require('express');
var fetch = require('node-fetch');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res){
    fetch('https://xkcd.com/info.0.json')
        .then(res => res.json())
        .then(data => {
            res.render('index', {data:data});
        });
});

app.get('/random', function(req, res){
    fetch('https://xkcd.com/info.0.json')
        .then(res => res.json())
        .then(data => {
            var max = data.num + 1;
            var min = 1;
            var rand = Math.floor(Math.random() * (max - min) + min);
            fetch(`https://xkcd.com/${rand}/info.0.json`)
                .then(randRes => randRes.json())
                .then(data => {
                    res.render('random', {data:data});
                });
        });
});

app.listen(port, function(){});