const ObjectId = require('mongodb').ObjectID;

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