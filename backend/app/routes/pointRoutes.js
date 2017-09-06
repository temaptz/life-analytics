const authorization = require('../helpers/authorization');

module.exports = function(app, db) {
    app

        // Добавление точки
        .post('/graph/:graphId/points', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {
                    if ( user && user._id ) {

                        const userId  = user._id,
                            graphId = request.params.graphId;

                        authorization.checkGraphAccess(db, userId, graphId)
                            .then((accessAllowed) => {
                                if ( accessAllowed ) {

                                    let point = {
                                        graphId : request.params.graphId,
                                        value   : request.body.value,
                                        date    : new Date()
                                    };

                                    if ( !point.value || !point.graphId ) {
                                        response.status(500).send('Empty value');
                                    }

                                    db
                                        .collection('points')
                                        .insert(point, (err, result) => {
                                            if (err) {
                                                response.send(err);
                                            } else {
                                                response.send(result);
                                            }
                                        });

                                } else {

                                    authorization.accessDenied(response);

                                }
                            });

                    } else {

                        authorization.accessDenied(response);

                    }
                });
        })

        // Получение точек графика
        .get('/graph/:graphId/points', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then((user) => {
                    if ( user && user._id ) {

                        const userId  = user._id,
                              graphId = request.params.graphId;

                        authorization.checkGraphAccess(db, userId, graphId)
                            .then((accessAllowed) => {
                                if ( accessAllowed ) {

                                    db
                                        .collection('points')
                                        .find({
                                            graphId : graphId
                                        })
                                        .sort({
                                            date : 1
                                        })
                                        .toArray((err, result) => {
                                            if (err) {
                                                response.send(err);
                                            } else {
                                                response.send(result);
                                            }
                                        });

                                } else {

                                    authorization.accessDenied(response);

                                }
                            });

                    } else {

                        authorization.accessDenied(response);

                    }
                });
        });
};