let express = require('express'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    favicon = require('serve-favicon'),
    passport = require('passport');
    
module.exports = function() {
    let app = express();
    app.use(favicon('public/favicon.png'));
    app.use(compress());
    app.use(morgan('tiny'));
    app.use(helmet());
    app.set('trust proxy', 1);
    app.use(cookieSession({
      name: 'session',
      keys: ['foo'], // change that
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/projects.server.routes.js')(app);
    require('../app/routes/login.server.routes.js')(app);
    require('../config/passport.js')(passport);
    app.use(express.static('./public'));
    require('../app/controllers/errors.server.controller.js')(app);
    return app;
};
