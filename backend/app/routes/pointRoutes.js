const authorization = require('../helpers/authorization');
const point = require('../helpers/point');
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');

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

                            const from = request.query.from,
                                  to   = request.query.to;

                            let filter = {
                                graphId : ObjectId(graphId)
                            };

                            if ( from || to ) {

                                filter.date = {};

                                if ( from ) {
                                    filter.date.$gte = moment(from).toDate();
                                }

                                if ( to ) {
                                    filter.date.$lte = moment(to).toDate();
                                }

                            }

                            db
                                .collection('points')
                                .find(filter)
                                .sort({
                                    date : 1
                                })
                                .toArray()
                                .then((res) => {

                                    if ( res && res.length > 0 && from ) {

                                        const firstPoint = res[0];

                                        point.getPreviousPoint(from, graphId, db)
                                            .then((previousPoint) => {

                                                if ( previousPoint && previousPoint.date ) {

                                                    let l1 = moment(firstPoint.date).unix() - moment(from).unix(),
                                                        l2 = moment(from).unix() - moment(previousPoint.date).unix(),
                                                        h1 = parseFloat(firstPoint.value),
                                                        h2 = parseFloat(previousPoint.value),
                                                        tg = ( h2 - h1 ) / ( l1 + l2 ),
                                                        L  = ( h2 / tg ) - l2,
                                                        x  = L * tg;

                                                    const virtualPoint = point.create(graphId, x, null, moment(from).toDate());
                                                    virtualPoint.isVirtual = true;

                                                    res.unshift(virtualPoint);

                                                }


                                                response.send(res);

                                            }, () => {

                                                response.send(res);

                                            });

                                    } else {

                                        response.send(res);

                                    }

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