const userRoutes = require('./userRoutes');
const graphRoutes = require('./graphRoutes');
const pointRoutes = require('./pointRoutes');

module.exports = (app, db) => {
    userRoutes(app, db);
    graphRoutes(app, db);
    pointRoutes(app, db);
};