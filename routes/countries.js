
const express = require('express');
const router = express.Router();
const pool = require('../db/database');

// Check if user is logged in
function requireLogin(req, res, next) {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }

    next();
}

// Display all countries
router.get('/', requireLogin, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM country ORDER BY country_id'
        );

        res.render('countries', {
            countries: result.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading countries.');
    }
});

// Display Add Country form
router.get('/add', requireLogin, (req, res) => {
    res.render('add-country', { error: null });
});

// Save a new country
router.post('/add', requireLogin, async (req, res) => {
    try {
        const country_name = req.body.country_name.trim();
        const popular_site = req.body.popular_site.trim();
        const capital = req.body.capital.trim();
        const populationText = req.body.population;
        const visited = req.body.visited || null;

        // Validate required text fields
        if (!country_name || !popular_site || !capital) {
            return res.status(400).render('add-country', {
                error: 'All country information except Visited is required.'
            });
        }

        // Validate field lengths
        if (country_name.length > 30 ||
            popular_site.length > 50 ||
            capital.length > 30) {
            return res.status(400).render('add-country', {
                error: 'One or more fields exceed their maximum length.'
            });
        }

        // Validate population
        if (!/^\d+$/.test(populationText)) {
            return res.status(400).render('add-country', {
                error: 'Population must be a whole number greater than or equal to 0.'
            });
        }

        const population = Number(populationText);

        if (!Number.isSafeInteger(population)) {
            return res.status(400).render('add-country', {
                error: 'Please enter a valid population.'
            });
        }

        // Validate visited
        if (visited !== null && visited !== 'Y' && visited !== 'N') {
            return res.status(400).render('add-country', {
                error: 'Visited must be Y or N.'
            });
        }

        // Insert country into database
        await pool.query(
            `INSERT INTO country
            (country_name, popular_site, capital, population, visited)
            VALUES ($1, $2, $3, $4, $5)`,
            [country_name, popular_site, capital, population, visited]
        );

        res.redirect('/countries');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding country.');
    }
});


// Display Edit Country form
router.get('/edit/:id', requireLogin, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM country WHERE country_id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Country not found.');
        }

        res.render('edit-country', {
            country: result.rows[0],
            error: null
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading country.');
    }
});

// Update country
router.post('/edit/:id', requireLogin, async (req, res) => {
    try {
        const { country_name, popular_site, capital, population, visited } = req.body;

        const name = country_name.trim();
        const site = popular_site.trim();
        const countryCapital = capital.trim();
        const populationText = population;
        const visitedValue = visited || null;

        if (!name || !site || !countryCapital) {
            return res.status(400).send('All required fields must be completed.');
        }

        if (name.length > 30 || site.length > 50 || countryCapital.length > 30) {
            return res.status(400).send('One or more fields exceed their maximum length.');
        }

        if (!/^\d+$/.test(populationText)) {
            return res.status(400).send('Population must be a whole number greater than or equal to 0.');
        }

        const populationValue = Number(populationText);

        if (!Number.isSafeInteger(populationValue)) {
            return res.status(400).send('Please enter a valid population.');
        }

        if (visitedValue !== null && visitedValue !== 'Y' && visitedValue !== 'N') {
            return res.status(400).send('Visited must be Y or N.');
        }

        const result = await pool.query(
            `UPDATE country
             SET country_name = $1,
                 popular_site = $2,
                 capital = $3,
                 population = $4,
                 visited = $5
             WHERE country_id = $6`,
            [name, site, countryCapital, populationValue, visitedValue, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Country not found.');
        }

        res.redirect('/countries');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating country.');
    }
});


// Delete a country
router.post('/delete/:id', requireLogin, async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM country WHERE country_id = $1',
            [req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Country not found.');
        }

        res.redirect('/countries');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting country.');
    }
});


// Display country map
router.get('/map/:id', requireLogin, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM country WHERE country_id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Country not found.');
        }

        res.render('map', {
            country: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading country map.');
    }
});

module.exports = router;