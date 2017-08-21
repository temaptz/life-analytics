const ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app

        // Добавление графика
        .post('/graph', (request, response) => {
            let graph = {
                name       : request.body.name,
                unitId     : request.body.unitId,
                dateCreate : new Date(),
                deleted    : false
            };

            if ( !graph.name || !graph.unitId ) {
                response.status(500).send('Empty parameter');
            }

            db
                .collection('graphs')
                .insert(graph, (err, result) => {
                    if (err) {
                        response.send(err);
                    } else {
                        response.send(result);
                    }
                });
        })

        // Получение списка графиков
        .get('/graph', (request, response) => {
            db
                .collection('graphs')
                .find({ deleted : false })
                .sort({ dateCreate : -1 })
                .toArray((err, result) => {
                    if (err) {
                        response.send(err);
                    } else {
                        response.send(result);
                    }
                });
        })

        // Получение одного графика
        .get('/graph/:id', (request, response) => {
            db
                .collection('graphs')
                .findOne({
                    _id     : ObjectId(request.params.id),
                    deleted : false
                })
                .then((res) => {
                    response.send(res);
                }, (err) => {
                    response.send(err);
                });
        })

        // Удаление графика
        .delete('/graph/:id', (request, response) => {
            db
                .collection('graphs')
                .findOneAndUpdate(
                    { _id : ObjectId(request.params.id) },
                    { $set: { deleted : true } }
                )
                .then((res) => {
                    response.send(res);
                }, (err) => {
                    response.send(err);
                });
        });
};