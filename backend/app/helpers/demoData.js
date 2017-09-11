const moment = require('moment');
const point = require('./point');

// Генериновать демо графики
module.exports.generate = (userId, db) => {

    const pullUpGraph = generatePullUpGraphData(userId),
        weightGraph   = generateWeightGraphData(userId),
        moneyGraph    = generateMoneyGraphData(userId);

    return db
        .collection('graphs')
        .insertMany([pullUpGraph, weightGraph, moneyGraph])
        .then((graphsRes) => {

            if ( graphsRes && graphsRes.insertedIds && graphsRes.insertedIds.length === 3 ) {

                const pullUpPoints = generatePullUpGraphPoints(graphsRes.insertedIds[0]),
                    weightPoints   = generateWeightGraphPoints(graphsRes.insertedIds[1]),
                    moneyPoints    = generateMoneyGraphPoints(graphsRes.insertedIds[2]);

                let pointsData = pullUpPoints
                    .concat(weightPoints)
                    .concat(moneyPoints);

                return db
                    .collection('points')
                    .insertMany(pointsData)
                    .then((pointsRes) => {

                        return pointsRes;

                    }, (err) => {

                        return Promise.reject(err);

                    });

            } else {

                return Promise.reject(graphsRes);

            }

        }, (err) => {

            return Promise.reject(err);

        });

};

// График личных финансов
generateMoneyGraphData = (userId) => {
    return {
        name : "Мой банковский счет (демо)",
        unitId : 0,
        dateCreate : new Date(),
        deleted : false,
        userId : userId
    }
};

// График массы тела
generateWeightGraphData = (userId) => {
    return {
        name : "Мой вес (демо)",
        unitId : 1,
        dateCreate : new Date(),
        deleted : false,
        userId : userId
    }
};

// График подтягиваний
generatePullUpGraphData = (userId) => {
    return {
        name : "Подтягиваний в день (демо)",
        unitId : 2,
        dateCreate : new Date(),
        deleted : false,
        userId : userId
    }
};

// Точки графика личных финансов
generateMoneyGraphPoints = (graphId) => {
    const now  = moment(),
        values = [300000, 270000, 210000, 90000, 120000, 173000, 161000, 140000, 80000, 120000];

    let result = [];

    values.forEach((value) => {
        let subtractDays = 7;
        result.push(point.create(graphId, value, now.toDate()));
        now.subtract(subtractDays, 'days');
    });

    return result.reverse();
};

// Точки графика массы тела
generateWeightGraphPoints = (graphId) => {
    const now  = moment(),
        values = [75.2, 76.5, 79.3, 82.5, 82.9, 81.7, 81.3, 80.2, 78.3, 76.2];

    let result = [];

    values.forEach((value) => {
        let subtractDays = 7;
        result.push(point.create(graphId, value, now.toDate()));
        now.subtract(subtractDays, 'days');
    });

    return result.reverse();
};

// Точки графика массы тела
generatePullUpGraphPoints = (graphId) => {
    const now  = moment(),
        values = [24, 10, 15, 32, 18, 14, 9, 12, 15, 9];

    let result = [];

    values.forEach((value) => {
        let subtractDays = 7;
        result.push(point.create(graphId, value, now.toDate()));
        now.subtract(subtractDays, 'days');
    });

    return result.reverse();
};