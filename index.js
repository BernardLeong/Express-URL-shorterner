const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Url = require('./models/url.js')
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');


mongoose.connect('mongodb://Peter:123123@ds145780.mlab.com:45780/my-mongodb-app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', () => {
    app.listen(3000, () => {
        console.log('Listening on port 3000...');
    });
});

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/url', (req, res) => {
    //console.log(req.body);
    const shorten = Math.random().toString(36).substr(2, 5)
//convert url to strong String


//find long URL 
    Url.findOne({ longurl: req.body.longurl }, (err, document) => {
        if (document) {
            res.render('url', { url: document });
        } else {


            //and create shorten URL
            Url.create({
                longurl: req.body.longurl,
                shorturl: shorten
            }, (err, document) => {
                if (err) { return console.log(err) }
               // console.log('urlsave',document)
                res.render('url', { url: document });
            });
        }
    });
});

//receive /parametres here
app.get('/:inputUrl', (req, res) => {
    let inputUrl = req.params.inputUrl


    Url.findOne({ shorturl: inputUrl }, (err, doc) => {
        //execute redirection first
        if (doc) {
            res.redirect(doc.longurl);
        } else {
            res.render('index', { invalidUrl: inputUrl });
            //send out error message here
        }
    })
})
