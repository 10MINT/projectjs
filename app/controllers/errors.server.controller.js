module.exports = function (app) {
    // Handle 404
    app.use(error404);
    // Handle 500
    app.use(error500);
    return app;
};

function error404(req, res) {
    res.status(400).render('error', {
        title: 'Error 404',
        message: '404: File Not Found',
        errorCode: 404
    });
}

function error500(error, req, res, next) {
    res.status(500).render('error', {
        title: 'Error 500',
        message:'500: Internal Server Error',
        errorCode: 500
    });
}