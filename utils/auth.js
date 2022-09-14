const withAuth = (req, res, next) => {
    // if user not logged in, redirect user to home page/login page
    // directly from `/list` and `/restaurants/:id` routes
    if (!req.session.loggedIn) {
        res.redirect('/');
    } else {
        // if user logged in, execute route function to allow user to view restaurants or list
        // call next() if user is authenticated
        next();
    }
};

module.exports = withAuth;