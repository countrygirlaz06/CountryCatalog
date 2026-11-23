# Country Catalog

## Project Overview

Country Catalog is a full-stack web application that allows users to log in and manage country records. Users can view, add, edit, and delete countries, as well as access a country map.

The application uses Node.js, Express, EJS, and PostgreSQL. It is deployed through Railway and uses Supabase for its online database.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runs the server-side application. |
| Express.js | Handles server requests and routes. |
| EJS | Creates dynamic webpages. |
| PostgreSQL | Stores country records. |
| pg | Connects Node.js to PostgreSQL. |
| Supabase | Hosts the online database. |
| express-session | Manages user login sessions. |
| dotenv | Manages environment variables. |
| HTML, CSS, JavaScript | Builds and styles the website. |
| Git and GitHub | Tracks and stores project code. |
| Railway | Hosts the web application. |

## Database Structure

The application uses a PostgreSQL database with a table named `country`.

### Country Table

| Column | Data Type | Description |
|---|---|---|
| country_id | INTEGER | Automatically generated primary key. |
| country_name | VARCHAR(30) | Name of the country. |
| popular_site | VARCHAR(50) | Popular tourist attraction. |
| capital | VARCHAR(30) | Capital city. |
| population | INTEGER | Country population. |
| visited | VARCHAR(1) | Whether the country has been visited. |

### Database Rules

- `country_id` is the primary key and is automatically generated.
- Country name, popular site, capital, and population are required.
- Population must be zero or greater.
- `visited` must contain either `Y` or `N`.

## Project Folder Structure

```text
CountryCatalog/
├── .gitignore
├── .env
├── package.json
├── package-lock.json
├── server.js
├── db/
│   └── database.js
├── routes/
│   ├── auth.js
│   └── countries.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
└── views/
    ├── index.ejs
    ├── welcome.ejs
    ├── countries.ejs
    ├── add-country.ejs
    ├── edit-country.ejs
    └── map.ejs
```

### Folder and File Descriptions

| Location | Purpose |
|---|---|
| `server.js` | Configures and starts the Express server. |
| `db/database.js` | Connects the application to PostgreSQL. |
| `routes/auth.js` | Handles login and logout. |
| `routes/countries.js` | Handles country CRUD operations. |
| `views/` | Contains the EJS webpage templates. |
| `public/css/` | Contains website styling. |
| `public/js/` | Contains browser-side JavaScript. |
| `public/images/` | Stores website images. |
| `.env` | Stores private configuration and credentials. |
| `.gitignore` | Prevents private and unnecessary files from being uploaded. |

## Application Functionality

The application supports the four CRUD operations:

- **Create:** Add new country records.
- **Read:** View existing country records.
- **Update:** Edit country information.
- **Delete:** Remove country records.

Authentication protects the country management pages, and sessions maintain the user's login status.

## Deployment

- **Source Code:** [Country Catalog GitHub Repository](https://github.com/countrygirlaz06/CountryCatalog)
- **Application Hosting:** Railway
- **Database Hosting:** Supabase

The application uses environment variables to manage database connections, login credentials, and session configuration.

## Learning Outcomes

This project provided experience with full-stack development, Express routing, EJS templates, PostgreSQL, CRUD operations, authentication, session management, environment variables, GitHub, and cloud deployment.
