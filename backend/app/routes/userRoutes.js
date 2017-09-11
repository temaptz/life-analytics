const url = require('url');
const uuidV4 = require('uuid/v4');
const demoData = require('../helpers/demoData');

module.exports = function(app, db) {
    app

        // Вход
        .get('/user/signin', (request, response) => {

            let query = url.parse(request.url, true).query;

            // Поиск существующего пользователя
            db
                .collection('users')
                .findOne({
                    providerUserId : query.providerUserId,
                    provider       : query.provider,
                    deleted        : false
                })
                .then((res) => {

                    if ( res ) {

                        // Если пользователь есть, то отдаем запись
                        response.send(res);

                    } else {

                        // Если пользователь не найден, то нужно создать его
                        const user = {
                            name           : query.name,
                            providerUserId : query.providerUserId,
                            provider       : query.provider,
                            token          : uuidV4(),
                            dateCreate     : new Date(),
                            deleted        : false
                        };

                        db
                            .collection('users')
                            .insertOne(user)
                            .then((userRes) => {

                                demoData.generate(userRes.insertedId, db)
                                    .then(() => {
                                        response.send(userRes.ops[0]);
                                    });

                            }, (err) => {

                                response.send(err);

                            });

                    }

                }, (err) => {

                    response.send(err);

                });
        });
};