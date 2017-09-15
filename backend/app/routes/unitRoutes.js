const authorization = require('../helpers/authorization');

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

module.exports = (app, db) => {
    app

        // Получение списка единиц измерения
        .get('/unit', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then(() => {

                    response.send(unitList);

                }, () => {

                    authorization.accessDenied(response);

                });
        })

        // Получение единицы измерения
        .get('/unit/:id', (request, response) => {
            authorization.getCurrentUserByHeader(request, db)
                .then(() => {

                    const unitId  = request.params.id;
                    let result = [];

                    unitList.forEach((unit) => {
                        if ( unit._id == unitId ) {
                            result = unit;
                        }
                    });

                    response.send(result);

                }, () => {

                    authorization.accessDenied(response);

                });
        });
};