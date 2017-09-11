const authorization = require('../helpers/authorization');
const point = require('../helpers/point');
const ObjectId = require('mongodb').ObjectID;

module.exports = (app, db) => {
    app

        // Добавление точки
        .post('/graph/:graphId/points', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId  = user._id,
                        graphId = request.params.graphId;

                    authorization.checkGraphAccess(userId, graphId, db)
                        .then(() => {

                            const point = point.create(request.params.graphId, request.body.value);

                            if ( !point.value || !point.graphId ) {
                                response.status(500).send('Empty value');
                            }

                            db
                                .collection('points')
                                .insertOne(point)
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

        // Получение точек графика
        .get('/graph/:graphId/points', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId  = user._id,
                        graphId = request.params.graphId;

                    authorization.checkGraphAccess(userId, graphId, db)
                        .then(() => {

                            db
                                .collection('points')
                                .find({
                                    graphId : ObjectId(graphId)
                                })
                                .sort({
                                    date : 1
                                })
                                .toArray()
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