const userRoutes = require('./userRoutes');
const graphRoutes = require('./graphRoutes');
const unitRoutes = require('./unitRoutes');
const pointRoutes = require('./pointRoutes');

module.exports = (app, db) => {
    userRoutes(app, db);
    graphRoutes(app, db);
    unitRoutes(app, db);
    pointRoutes(app, db);
};