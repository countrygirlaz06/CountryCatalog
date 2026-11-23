
const express = require('express');
const router = express.Router();

// Handle login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

if (
    username === process.env.LOGIN_USERNAME &&
    password === process.env.LOGIN_PASSWORD
) {
    req.session.regenerate((error) => {
        if (error) {
            return res.status(500).send('Unable to create session.');
        }

        req.session.loggedIn = true;

        req.session.save((error) => {
            if (error) {
                return res.status(500).send('Unable to save session.');
            }

            res.redirect('/welcome');
        });
    });
} else {
        res.render('index', {
            error: 'Incorrect username or password.'
        });
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('Unable to log out.');
        }

        res.redirect('/');
    });
});

module.exports = router;
