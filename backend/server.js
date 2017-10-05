const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const config      = require('./config');
const cors        = require('cors')
const app         = express();

app.use(cors());
app.use(bodyParser.json({type:'*/*'}));

MongoClient.connect(config.dbUrl, (err, database) => {
    if (err) {
        return console.log(err)
    }
    require('./app/routes')(app, database);
    app.listen(config.port, () => {
        console.log('port: ' + config.port);
    });
});