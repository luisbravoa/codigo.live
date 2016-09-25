var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var documentsObjects = {};

const config = require('./config');
const mongoose = require('mongoose');

// routes
const documents = require('./routes/documents');

// models
var Session = require('./models/Session');
var Document = require('./models/Document');


const logger = require('winston');
const port = 3000;

server.listen(port, function(){
    logger.info('Server started listening at port ' + port);
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

//CORS middleware
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.put('/documents', function (req, res) {
    Document.create()
        .then(function (data) {

            logger.info('created document:', data.id);
            // avoid race condition
            setTimeout(()=>{
                res.send(data);
            }, 100);

        })
        .catch(function (e) {
            req.error(e);
        });
});

app.get('/qr/:id', documents.qr);

app.get('/new', function (req, res) {
    Document.create()
        .then(function (data) {

            logger.info('created document:', data.id);
            res.redirect('/' + data.id);

        })
        .catch(function (e) {
            req.error(e);
        });
});

function main(req, res) {

    if(req.params.id){
        let documentId = req.params.id;
        Document.findById(documentId)
            .then(function (document) {
                res.render('index', {id: documentId});
            })
            .catch(function (error) {
                res.render('error', {code: 404, message: 'Document Not Found', id:''});
            });
    } else {
        res.render('index', {id: ''});
    }


}

app.get('/favicon.ico', function (req, res) {
    res.status(404).send();
});
app.get('/', main);
app.get('/:id', main);

// connect to database
var url = 'mongodb://'+ config.database.host + '/' + config.database.name;
mongoose.connect(url);

io.on('connection', function (socket) {
    var documentId = socket.handshake.query.id;
    logger.info('New session for doc ' + documentId);
    if(!documentsObjects[documentId]){
        logger.info('Created Document Id '+ documentId);

        Document.findById(documentId)
            .then(function (document) {
                documentsObjects[documentId] = document;
                document.addSession({
                    socket: socket
                });
            })
            .catch(function (error) {
                socket.emit('message', {type: 'error', data:{ message: error.toString(), code:404}});
                socket.disconnect();
            });
    }   else {
        var document = documentsObjects[documentId];
        document.addSession({
            socket: socket
        });
    }
    
});

setInterval(function () {
    for(var id in documentsObjects){
        let document = documentsObjects[id];
        // housekeeping
    }
}, 2000);