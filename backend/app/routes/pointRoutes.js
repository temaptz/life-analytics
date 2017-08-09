module.exports = function(app, db) {
    app

        // Добавление точки
        .post('/graph/:graphId/points', (request, response) => {
            let point = {
                graphId : request.params.graphId,
                value   : request.body.value,
                date    : new Date()
            };

            if ( !point.value ) {
                response.status(500).send('Empty value');
            }

            response.send('success');
            return;

            db.collection('points').insert(point, (err, result) => {
                if (err) {
                    response.send(err);
                } else {
                    response.send(result);
                }
            });
        })

        // Получение точек графика
        .get('/graph/:graphId/points', (request, response) => {
            db.collection('points').find({graphId : request.params.graphId}).sort({date : 1}).toArray((err, result) => {
                if (err) {
                    response.send(err);
                } else {
                    response.send(result);
                }
            });
        });
};