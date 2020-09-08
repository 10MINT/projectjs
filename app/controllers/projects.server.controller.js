let Project = require('mongoose').model('Project');

exports.list = function(req, res, next) {
    if (req.isAuthenticated()) {
        // console.log('user object = ' + JSON.stringify(req.user));
        Project.listByUser(req.user._id,
            function(projects) {
                res.render('dashboard', { 
                    title: 'Dashboard',
                    user: req.user,
                    projects: projects
                });
            }
        );   
    }
    else res.status(401).redirect('/');
    
};

exports.new = function (req, res, next) {
    if (req.isAuthenticated()) {
        Project.createWithId(req.user._id, {}, function(err, proj) {
            if (err) {
                res.status(500).end();
                return next(err);
            } else {
                res.redirect('/projects/' + proj._id);
            }
        });
    }
    else res.status(401).end();
};

exports.render = function (req, res, next) {
    // console.log("authenticated?", req.isAuthenticated());
    if (req.isAuthenticated()) {
        Project.read(req.user._id, req.params.id, function(err, proj) {
            if (err) {
                res.status(403).end();
                return next(err);
            } 
            else {
                res.render('project', { 
                    title: process.env.APP_NAME + " | " + proj.name,
                    user: req.user,
                    project: proj,
                });
            }
        });
    }
    else {
        Project.read(null, req.params.id, function(err, proj) {
            if (err) {
                res.status(403).end();
                return next(err);
            } 
            else {
                // console.log(proj);
                res.render('project', { 
                    title: process.env.APP_NAME + " | " + proj.name,
                    user: null,
                    project: proj,
                });
            }
        });
    }
};

exports.delete = function(req, res, next) {
    if (req.isAuthenticated()) {
        Project.delete(req.user._id, req.params.id, function(err) {
            if (err) res.status(500).end();
            else res.status(204).end();
        });
    }
    else res.status(401).end();
};

exports.update = function(req, res, next) {
    // console.log(req.body);
    if (req.isAuthenticated()) {
        Project.update(req.user._id, req.params.id, req.body, function(err, proj) {
            if (err) {
                res.status(404).end();
                return next(err);
            } else {
                res.json(proj);
            }
        });
    }
    else res.status(401).end();
};

exports.copy = function (req, res, next) {
    if (req.isAuthenticated()) {
        Project.read(req.user._id, req.params.id, function(err, proj) {
            if (err) {
                res.status(403).end();
                return next(err);
            } 
            else {
                let rawProject = proj.toObject();
                delete rawProject._id;
                Project.createWithId(req.user._id, rawProject, function(err, proj) {
                    if (err) {
                        res.status(500).end();
                        return next(err);
                    } else {
                        res.redirect('/projects/' + proj._id);
                    }
                });
            }
        });
    }
    else res.status(401).end();
};
