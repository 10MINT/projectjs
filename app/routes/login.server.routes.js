let passport = require('passport');
const REDIRECTS = {
  'failureRedirect': '/',
  'successRedirect': '/projects'
};

module.exports = function(app) {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', 
      passport.authenticate('google', REDIRECTS)
    );
    ['github', 'facebook', 'twitter'].forEach(e => {
      app.get(`/auth/${e}`, passport.authenticate(e));
      app.get(`/auth/${e}/callback`, passport.authenticate(e, REDIRECTS));
    });
    
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });
};