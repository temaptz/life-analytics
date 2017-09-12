const authorization = require('../helpers/authorization');
const ObjectId = require('mongodb').ObjectID;

module.exports = (app, db) => {
    app

        // Добавление графика
        .post('/graph', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId = user._id;

                    let graph = {
                        name       : request.body.name,
                        unitId     : request.body.unitId,
                        dateCreate : new Date(),
                        deleted    : false,
                        userId     : userId
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

                }, () => {

                    authorization.accessDenied(response);

                });
        })

        // Получение списка графиков
        .get('/graph', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId = user._id;

                    db
                        .collection('graphs')
                        .find({
                            userId  : ObjectId(userId),
                            deleted : false
                        })
                        .sort({ dateCreate : -1 })
                        .toArray((err, result) => {
                            if (err) {
                                response.send(err);
                            } else {
                                response.send(result);
                            }
                        });

                }, () => {

                    authorization.accessDenied(response);

                });
        })

        // Получение одного графика
        .get('/graph/:id', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId = user._id,
                        graphId  = request.params.id;

                    authorization.checkGraphAccess(userId, graphId, db)
                        .then(() => {

                            db
                                .collection('graphs')
                                .findOne({
                                    _id     : ObjectId(graphId),
                                    userId  : ObjectId(userId),
                                    deleted : false
                                })
                                .then((res) => {
                                    response.send(res);
                                }, (err) => {
                                    response.send(err);
                                });

                        }, () => {

                            authorization.accessDenied(response);

                        });

                }, () => {

                    authorization.accessDenied(response);

                });
        })

        // Удаление графика
        .delete('/graph/:id', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId = user._id,
                        graphId  = request.params.id;

                    authorization.checkGraphAccess(userId, graphId, db)
                        .then(() => {

                            db
                                .collection('graphs')
                                .findOneAndUpdate(
                                    {
                                        _id     : ObjectId(graphId),
                                        userId  : ObjectId(userId),
                                    },
                                    {
                                        $set: {
                                            deleted : true
                                        }
                                    }
                                )
                                .then((res) => {
                                    response.send(res);
                                }, (err) => {
                                    response.send(err);
                                });

                        }, () => {

                            authorization.accessDenied(response);

                        });

                }, () => {

                    authorization.accessDenied(response);

                });
        });
};