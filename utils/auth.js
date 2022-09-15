const withAuth = (req, res, next) => {
    // if user not logged in, redirect user to home page
    // directly from restaurants routes
    if (!req.session.loggedIn) {
        res.render('/', { loggedIn: false });
    } else {
        // if user logged in, execute route function to allow user to view restaurants or list
        // call next() if user is authenticated
        next();
    }
};

module.exports = withAuth;