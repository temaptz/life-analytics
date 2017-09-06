const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');
const cors        = require('cors')
const port        = 8000;
const app         = express();

app.use(cors());
app.use(bodyParser.json({type:'*/*'}));

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err)
    }
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('port: ' + port);
    });
});