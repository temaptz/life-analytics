const ObjectId = require('mongodb').ObjectID;

// Получить запись пользователя по заголовку авторизации
const getCurrentUserByHeader = (request, db) => {

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
const checkGraphAccess = (userId, graphId, db) => {

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

// Проверить доступ пользователя к графику
const checkPointAccess = (userId, pointId, db) => {

    if ( userId && pointId ) {

        return db
            .collection('points')
            .findOne({
                _id     : ObjectId(pointId),
            })
            .then((res) => {

                if ( res && res.graphId ) {
                    return checkGraphAccess(userId, res.graphId, db);
                }

                return Promise.reject(false);

            }, () => {

                return Promise.reject(false);

            });

    }

    return Promise.reject(false);
};

// Получить график по заголовкам
const getGraphByHeader = (request, db) => {

    const authHeader = request.get('Authorization');

    if ( authHeader ) {

        if ( authHeader.indexOf('GraphHash') !== -1 ) {

            const hash = authHeader.replace('GraphHash', '').trim();

            return db
                .collection('graphs')
                .findOne({
                    hash    : hash,
                    deleted : false
                })
                .then((graph) => {

                    if ( graph && graph._id ) {
                        return graph;
                    }

                    return Promise.reject(graph);

                }, (err) => {

                    return Promise.reject(err);

                });

        }

    }

    return Promise.reject(new Error('unknown error'));
};

// Показать ошибку доступа
const accessDenied = (response) => {
    response.status(403).send('Access Denied');
};

module.exports.getCurrentUserByHeader = getCurrentUserByHeader;
module.exports.checkGraphAccess       = checkGraphAccess;
module.exports.checkPointAccess       = checkPointAccess;
module.exports.getGraphByHeader       = getGraphByHeader;
module.exports.accessDenied           = accessDenied;