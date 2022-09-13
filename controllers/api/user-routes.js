const router = require('express').Router();
const { User } = require('../../models');
// middleware import
const withAuth = require('../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update user password
router.put('update/:id', withAuth, async (req, res) => {
    // req.body should look like this:
    // {"id": "ID#", "password": "PASSWORD"}
    try {
        const result = await User.update(
            { password: req.body.password },
            { where: { id: req.params.id}}
        )
        .then(() => res.render('homepage', {
            restaurants,
            loggedIn: req.session.loggedIn,
        }));
    } catch (err) {
        res.status(500).json(err);
    }
});

// user to login // is route correct for login "page" to be on home page?
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect username. Please try again.' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password. Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'Successful login.' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user to logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            document.location.replace('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;