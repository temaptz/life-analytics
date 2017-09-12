const authorization = require('../helpers/authorization');

module.exports = (app, db) => {
    app

        // Получение списка единиц измерения
        .get('/unit', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then(() => {

                    const unitList = [
                        {
                            _id  : 0,
                            name : 'руб'
                        },
                        {
                            _id  : 1,
                            name : 'кг'
                        },
                        {
                            _id  : 2,
                            name : 'раз'
                        },
                        {
                            _id  : 3,
                            name : 'час'
                        }
                    ];

                    response.send(unitList);

                }, () => {

                    authorization.accessDenied(response);

                });
        });
};