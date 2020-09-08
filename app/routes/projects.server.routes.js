module.exports = function(app) {
    let projects = require('../controllers/projects.server.controller');
    app.get('/projects', projects.list);
    app.get('/projects/new', projects.new);
    
    app.get('/projects/:id', projects.render);
    app.put('/projects/:id', projects.update);
    app.delete('/projects/:id', projects.delete);
    app.get('/projects/:id/copy', projects.copy);
};