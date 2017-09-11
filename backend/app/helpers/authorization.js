const ObjectId = require('mongodb').ObjectID;

// Получить запись пользователя по заголовку авторизации
module.exports.getCurrentUserByHeader = (request, db) => {

    const authHeader = request.get('Authorization');

    if ( authHeader ) {

        if ( authHeader.indexOf('Token') !== -1 ) {

            const token = authHeader.replace('Token', '').trim();

            return db
                .collection('users')
                .findOne({
                    token   : token,
                    deleted : false
                })
                .then((user) => {

                    if ( user && user._id ) {
                        return user;
                    }

                    return Promise.reject(user);

                }, (err) => {

                    return Promise.reject(err);

                });

        }

    }

    return Promise.reject(new Error('unknown error'));
};

// Проверить доступ пользователя к графику
module.exports.checkGraphAccess = (userId, graphId, db) => {

    if ( userId && graphId ) {

        return db
            .collection('graphs')
            .findOne({
                _id     : ObjectId(graphId),
            })
            .then((res) => {

                if ( res && res.userId && res.userId.toString() === userId.toString() ) {
                    return true;
                }

                return Promise.reject(false);

            }, () => {

                return Promise.reject(false);

            });

    }

    return Promise.reject(false);
};

// Показать ошибку доступа
module.exports.accessDenied = (response) => {
    response.status(403).send('Access Denied');
};