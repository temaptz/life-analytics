const url = require('url');
const uuidV4 = require('uuid/v4');

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
                            .insert(user, (err, result) => {
                                if (err) {
                                    response.send(err);
                                } else {
                                    response.send(user);
                                }
                            });

                    }

                }, (err) => {

                    response.send(err);

                });
        });
};