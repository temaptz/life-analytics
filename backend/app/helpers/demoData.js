const moment = require('moment');
const point = require('./point');

// Генериновать демо графики
module.exports.generate = (userId, db) => {

    const moneyGraph    = generateMoneyGraphData(userId),
        weightGraph   = generateWeightGraphData(userId),
        sleepGraph = generateSleepGraphData(userId);

    return db
        .collection('graphs')
        .insertMany([moneyGraph, weightGraph, sleepGraph])
        .then((graphsRes) => {

            if ( graphsRes && graphsRes.insertedIds && graphsRes.insertedIds.length === 3 ) {

                const moneyPoints    = generateMoneyGraphPoints(graphsRes.insertedIds[0]),
                    weightPoints   = generateWeightGraphPoints(graphsRes.insertedIds[1]),
                    sleepPoints = generateSleepGraphPoints(graphsRes.insertedIds[2]);

                let pointsData = moneyPoints
                    .concat(weightPoints)
                    .concat(sleepPoints);

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
generateSleepGraphData = (userId) => {
    return {
        name : "Часов сна в день (демо)",
        unitId : 3,
        dateCreate : new Date(),
        deleted : false,
        userId : userId
    }
};

// Точки графика личных финансов
generateMoneyGraphPoints = (graphId) => {
    const now  = moment().subtract(12, 'hours'),
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
    const now  = moment().subtract(12, 'hours'),
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
generateSleepGraphPoints = (graphId) => {
    const now  = moment().subtract(12, 'hours'),
        values = [9, 6, 7, 10, 5, 8, 7, 7, 9, 7];

    let result = [];

    values.forEach((value) => {
        let subtractDays = 7;
        result.push(point.create(graphId, value, now.toDate()));
        now.subtract(subtractDays, 'days');
    });

    return result.reverse();
};