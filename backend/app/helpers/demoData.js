const moment = require('moment');
const point = require('./point');

const moneyGraph = {
    name       : "Мой банковский счет (демо)",
    unitId     : 0,
    dateCreate : new Date(),
    deleted    : false
};

const weightGraph = {
    name       : "Мой вес (демо)",
    unitId     : 1,
    dateCreate : new Date(),
    deleted    : false
};

const sleepGraph = {
    name       : "Часов сна в день (демо)",
    unitId     : 3,
    dateCreate : new Date(),
    deleted    : false
};

const moneyValues = [
    {value: '300000', remark: 'Кэшбэк'},
    {value: '270000', remark: 'Получил премию'},
    {value: '210000', remark: 'Получил зарплату'},
    {value: '90000' , remark: ''},
    {value: '121000', remark: 'Купил Ирине подарок на день рождения'},
    {value: '173000', remark: 'Нашел заначку'},
    {value: '161000', remark: 'Василий вернул долг'},
    {value: '140000', remark: 'Получил зарплату'},
    {value: '80000' , remark: 'Оплатил счета'},
    {value: '120000', remark: ''}
];

const weightValues = [
    {value: '75.2', remark: 'Кризис'},
    {value: '76.5', remark: 'Оказался на голодном острове'},
    {value: '79.3', remark: 'Сходил в поход'},
    {value: '82.5', remark: ''},
    {value: '82.9', remark: 'Съездил к маме'},
    {value: '81.7', remark: ''},
    {value: '81.3', remark: 'Поздний ужин'},
    {value: '80.2', remark: 'Сходил на день рождения к Люде'},
    {value: '78.3', remark: 'Поел на ночь'},
    {value: '76.2', remark: ''}
];

const sleepValues = [
    {value: '9' , remark: 'Отлично выспался сегодня'},
    {value: '6' , remark: 'Делал срочную работу до поздна'},
    {value: '7' , remark: ''},
    {value: '10', remark: 'Вздремнул днем'},
    {value: '5' , remark: 'Вечеринка'},
    {value: '8' , remark: 'Стараюсь соблюдать режим'},
    {value: '7' , remark: ''},
    {value: '7' , remark: ''},
    {value: '9' , remark: 'Хорошо выспался на выходных'},
    {value: '7' , remark: ''}
];

// Генериновать демо графики
const generate = (userId, db) => {

    const moneyGraphData = generateGraphData(moneyGraph, userId),
        weightGraphData  = generateGraphData(weightGraph, userId),
        sleepGraphData   = generateGraphData(sleepGraph, userId);

    return db
        .collection('graphs')
        .insertMany([moneyGraphData, weightGraphData, sleepGraphData])
        .then((graphsRes) => {

            if ( graphsRes && graphsRes.insertedIds && graphsRes.insertedIds.length === 3 ) {

                const moneyPoints = generateGraphPoints(moneyValues, graphsRes.insertedIds[0]),
                    weightPoints  = generateGraphPoints(weightValues, graphsRes.insertedIds[1]),
                    sleepPoints   = generateGraphPoints(sleepValues, graphsRes.insertedIds[2]);

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

// Генерация графика
generateGraphData = (graph, userId) => {
    graph.userId = userId;

    return graph;
};

// Точки графика
generateGraphPoints = (values, graphId) => {
    const now  = moment().subtract(24, 'hours'),
        subtractDays = 7;
    let result = [];

    values.forEach((item) => {

        console.log(item);

        result.push(point.create(graphId, item.value, item.remark, now.toDate()));
        now.subtract(subtractDays, 'days');

    });

    return result;
};

module.exports.generate = generate;