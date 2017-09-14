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
                        graphId   = request.params.graphId,
                        value     = request.body.value,
                        remark    = request.body.remark;

                    authorization.checkGraphAccess(userId, graphId, db)
                        .then(() => {

                            const newPoint = point.create(graphId, value, remark);

                            if ( !newPoint.value || !newPoint.graphId ) {
                                response.status(500).send('Empty value');
                            }

                            db
                                .collection('points')
                                .insertOne(newPoint)
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
        })

        // Добавление комментария для точки
        .post('/points/:pointId/remark', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {

                    const userId = user._id,
                        pointId  = request.params.pointId,
                        remark   = request.body.remark;

                    authorization.checkPointAccess(userId, pointId, db)
                        .then(() => {

                            db
                                .collection('points')
                                .findOneAndUpdate(
                                    {
                                        _id : ObjectId(pointId),
                                    },
                                    {
                                        $set: {
                                            remark : remark
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