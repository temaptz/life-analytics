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
                .then((res) => {
                    return res;
                }, () => {
                    return null;
                });

        }

    }

    return Promise.resolve(null);
};

// Проверить доступ пользователя к графику
module.exports.checkGraphAccess = (db, userId, graphId) => {

    if ( userId && graphId ) {

        return db
            .collection('graphs')
            .findOne({
                _id     : ObjectId(graphId),
            })
            .then((res) => {
                return ( res && res.userId && res.userId.toString() === userId.toString() );
            }, () => {
                return false;
            });

    }

    return Promise.resolve(false);
};

// Показать ошибку доступа
module.exports.accessDenied = (response) => {
    response.status(403).send('Access Denied');
};