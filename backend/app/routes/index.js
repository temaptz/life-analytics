const graphRoutes = require('./graphRoutes');
const pointRoutes = require('./pointRoutes');

module.exports = function(app, db) {
    graphRoutes(app, db);
    pointRoutes(app, db);
};