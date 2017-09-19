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
    {value: '300000', subtract: 1,  remark: 'Кэшбэк за покупки'},
    {value: '270000', subtract: 2,  remark: 'Получил премию'},
    {value: '210000', subtract: 1,  remark: 'Получил зарплату'},
    {value: '115000', subtract: 1,  remark: ''},
    {value: '121000', subtract: 1,  remark: 'Купил Ирине подарок на день рождения'},
    {value: '173000', subtract: 3,  remark: 'Нашел заначку'},
    {value: '161000', subtract: 7,  remark: 'Василий вернул долг'},
    {value: '140000', subtract: 7,  remark: 'Получил зарплату'},
    {value: '80000' , subtract: 7,  remark: 'Оплатил счета'},
    {value: '120000', subtract: 12, remark: 'Заказал гироскутер'},
    {value: '160000', subtract: 15, remark: 'Проценты на остаток'},
    {value: '150000', subtract: 19, remark: 'Ремонт в ванной'},
    {value: '177000', subtract: 17, remark: 'Получил зарплату'},
    {value: '145000', subtract: 12, remark: ''},
    {value: '140000', subtract: 15, remark: 'Успешно сэкономил на покупках'},
    {value: '125000', subtract: 19, remark: 'Мелкие расходы'},
    {value: '130000', subtract: 17, remark: 'Ремонт машины'},
    {value: '190000', subtract: 19, remark: 'Получил зарплату'},
    {value: '85000' , subtract: 11, remark: 'Съездил в отпуск'},
    {value: '127000', subtract: 17, remark: 'Расплатился по счетам'},
    {value: '147000', subtract: 21, remark: 'Оплатил аренду'},
    {value: '161000', subtract: 17, remark: 'Получил премию'},
    {value: '140000', subtract: 11, remark: 'Пополнил свободными деньгами'},
    {value: '120000', subtract: 19, remark: 'Проценты на остаток'},
    {value: '110000', subtract: 17, remark: 'Начало ведения графика'}
];

const weightValues = [
    {value: '75.2', subtract: 1,  remark: 'Еще немного скинул'},
    {value: '76.5', subtract: 1,  remark: 'Оказался на голодном острове'},
    {value: '79.3', subtract: 2,  remark: 'Сходил в поход'},
    {value: '82.5', subtract: 3,  remark: ''},
    {value: '82.9', subtract: 7,  remark: 'Съездил к маме'},
    {value: '81.7', subtract: 9,  remark: ''},
    {value: '81.3', subtract: 5,  remark: 'Поздний ужин'},
    {value: '80.2', subtract: 7,  remark: 'Сходил на день рождения к Люде'},
    {value: '78.3', subtract: 17, remark: 'Поел на ночь'},
    {value: '76.2', subtract: 27, remark: ''},
    {value: '75.2', subtract: 19, remark: 'Кризис'},
    {value: '76.5', subtract: 21, remark: 'Немного скинул'},
    {value: '79.3', subtract: 17, remark: 'Очень большая прогулка'},
    {value: '82.5', subtract: 23, remark: ''},
    {value: '82.9', subtract: 15, remark: 'Побывал на званом ужине'},
    {value: '81.7', subtract: 25, remark: ''},
    {value: '81.3', subtract: 21, remark: 'Поздно поел'},
    {value: '80.2', subtract: 19, remark: 'Сходил на день рождения к Люде'},
    {value: '78.3', subtract: 27, remark: 'Заказал вечером пиццу'},
    {value: '76.2', subtract: 19, remark: ''}
];

const sleepValues = [
    {value: '9' , subtract: 2,  remark: 'Отлично выспался сегодня'},
    {value: '6' , subtract: 1,  remark: 'Делал срочную работу до поздна'},
    {value: '7' , subtract: 2,  remark: ''},
    {value: '10', subtract: 3,  remark: 'Вздремнул днем'},
    {value: '5' , subtract: 7,  remark: 'Вечеринка'},
    {value: '8' , subtract: 9,  remark: 'Стараюсь соблюдать режим'},
    {value: '7' , subtract: 5,  remark: ''},
    {value: '7' , subtract: 17, remark: ''},
    {value: '9' , subtract: 27, remark: 'Хорошо выспался на выходных'},
    {value: '7' , subtract: 19, remark: ''},
    {value: '9' , subtract: 23, remark: 'Отлично выспался сегодня'},
    {value: '6' , subtract: 15, remark: 'Делал срочную работу до поздна'},
    {value: '7' , subtract: 17, remark: ''},
    {value: '10', subtract: 25, remark: 'Вздремнул днем'},
    {value: '5' , subtract: 21, remark: 'Вечеринка'},
    {value: '8' , subtract: 23, remark: 'Стараюсь соблюдать режим'},
    {value: '7' , subtract: 19, remark: ''},
    {value: '7' , subtract: 27, remark: ''},
    {value: '9' , subtract: 21, remark: 'Хорошо выспался на выходных'},
    {value: '7' , subtract: 17, remark: ''}
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
    const now          = moment(),
          subtractDays = 7;
    let result = [];

    values.forEach((item) => {

        let subtract = subtractDays;

        if ( item.subtract ) {
            subtract = item.subtract;
        }

        now.subtract(subtract, 'days');

        result.push(point.create(graphId, item.value, item.remark, now.toDate()));

    });

    return result;
};

module.exports.generate = generate;