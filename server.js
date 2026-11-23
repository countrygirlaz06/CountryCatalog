const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);

const countryRoutes = require('./routes/countries');
app.use('/countries', countryRoutes);

// Welcome page
app.get('/welcome', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }

    res.render('welcome');
});

// Home page
app.get('/', (req, res) => {
    res.render('index', { error: null });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});