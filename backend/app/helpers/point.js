const ObjectId = require('mongodb').ObjectID;
const moment   = require('moment');

// Конструктор точки
module.exports.create = (graphId, value, remark=null, date=null) => {
    if ( !date ) {
        date = new Date;
    }

    return {
        graphId : ObjectId(graphId),
        value   : value,
        remark  : remark,
        date    : date
    };
};

// Получить предыдущую точку
module.exports.getPreviousPoint = (lastDate, graphId, db) => {

    return db
        .collection('points')
        .findOne({
            graphId : ObjectId(graphId),
            date : {
                '$lt' : moment(lastDate).toDate()
            }
        }, {
            sort : {
                date : -1
            }
        })
        .then((res) => {

            return Promise.resolve(res);

        }, (err) => {

            return Promise.reject(err);

        });

};