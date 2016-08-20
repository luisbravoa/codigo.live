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
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);

app.put('/documents', function (req, res) {
    Document.create()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (e) {
            req.error(e);
        });
});


// connect to database
var url = 'mongodb://'+ config.database.host + '/' + config.database.name;
mongoose.connect(url);

io.on('connection', function (socket) {
    var documentId = socket.handshake.query.id;
    logger.info('New session for doc ' + documentId)
    if(!documentsObjects[documentId]){
        logger.info('Created Document Id '+ documentId);
        documentsObjects[documentId] = new Document({
            id: documentId
        });
    }
    var doc = documentsObjects[documentId];

    doc.addSession({
        socket: socket
    });
    
});
