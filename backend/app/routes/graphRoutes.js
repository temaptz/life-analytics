const ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app

        // Добавление графика
        .post('/graph', (request, response) => {
            let graph = {
                name       : request.body.name,
                dateCreate : new Date()
            };

            if ( !graph.name ) {
                response.status(500).send('Empty name');
            }

            db.collection('graphs').insert(graph, (err, result) => {
                if (err) {
                    response.send(err);
                } else {
                    response.send(result);
                }
            });
        })

        // Получение списка графиков
        .get('/graph', (request, response) => {
            db.collection('graphs').find({}).sort({dateCreate : -1}).toArray((err, result) => {
                if (err) {
                    response.send(err);
                } else {
                    response.send(result);
                }
            });
        })

        // Получение одного графика
        .get('/graph/:id', (request, response) => {
            db.collection('graphs').find({_id : ObjectId(request.params.id)}).sort({dateCreate : -1}).toArray((err, result) => {
                if (err) {
                    response.send(err);
                } else {
                    response.send(result);
                }
            });
        });
};