const ObjectId = require('mongodb').ObjectID;

// Конструктор точки
module.exports.create = (graphId, value, date=null) => {
    if ( !date ) {
        date = new Date;
    }

    return {
        graphId : ObjectId(graphId),
        value   : value,
        date    : date
    };
};