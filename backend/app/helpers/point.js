// Конструктор точки
module.exports.create = (graphId, value, date=null) => {
    if ( !date ) {
        date = new Date;
    }

    return {
        graphId : graphId,
        value   : value,
        date    : date
    };
};