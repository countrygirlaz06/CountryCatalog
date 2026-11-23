# Country Catalog

## Project Overview

Country Catalog is a full-stack web application that allows authenticated users to view, add, edit, and delete country records. Each country record includes the country's name, a popular tourist site, its capital city, population, and whether the country has been visited.

The application uses Node.js and Express for the backend, EJS for dynamically generated webpages, and PostgreSQL for data storage. User authentication is managed through Express sessions. The application connects to a PostgreSQL database hosted through Supabase and is deployed online using Railway.

## Features

- **User Authentication:** Users must sign in before accessing the country management pages.
- **Session Management:** Express sessions maintain the user's login status.
- **View Countries:** Displays the country records stored in the database.
- **Add Countries:** Allows users to enter and save new country records.
- **Edit Countries:** Allows users to update existing country information.
- **Delete Countries:** Allows users to remove country records.
- **Country Map:** Includes a map page for viewing country-related map information.
- **Database Integration:** Uses PostgreSQL to store and retrieve country records.
- **Online Deployment:** The application is hosted through Railway and connects to a Supabase PostgreSQL database.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runs the server-side JavaScript application. |
| Express.js | Handles HTTP requests, application routes, and middleware. |
| EJS | Generates dynamic HTML pages using server-side data. |
| PostgreSQL | Stores country records in a relational database. |
| pg | Connects the Node.js application to PostgreSQL. |
| Supabase | Hosts the online PostgreSQL database. |
| express-session | Manages user login sessions. |
| dotenv | Loads private configuration values from environment variables. |
| HTML | Structures the webpages. |
| CSS | Styles the application. |
| JavaScript | Adds application and browser-side functionality. |
| Git | Tracks changes to the project. |
| GitHub | Stores the project's source code online. |
| Railway | Hosts and runs the web application. |

## Database Structure

The application uses a PostgreSQL database named `country_catalog` locally and a corresponding database hosted through Supabase for the deployed application.

### Country Table

The database contains a table named `country` with the following columns:

| Column | Data Type | Description |
|---|---|---|
| `country_id` | INTEGER | Automatically generated primary key for each country. |
| `country_name` | VARCHAR(30) | Name of the country. |
| `popular_site` | VARCHAR(50) | A popular tourist attraction or site in the country. |
| `capital` | VARCHAR(30) | Capital city of the country. |
| `population` | INTEGER | Population of the country. Must be zero or greater. |
| `visited` | VARCHAR(1) | Indicates whether the country has been visited. Accepts `Y` or `N`. |

### Database Rules

- `country_id` is the primary key and is automatically generated.
- Country names, popular sites, capitals, and populations are required.
- Population cannot be negative.
- The `visited` column accepts only `Y` or `N`.

## Project Folder Structure

The project is organized into folders to separate server configuration, database connections, application routes, webpage templates, and public files.

```text
CountryCatalog/
│
├── .gitignore
├── .env
├── package.json
├── package-lock.json
├── server.js
│
├── db/
│   └── database.js
│
├── routes/
│   ├── auth.js
│   └── countries.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
└── views/
    ├── index.ejs
    ├── welcome.ejs
    ├── countries.ejs
    ├── add-country.ejs
    ├── edit-country.ejs
    └── map.ejs
```

### File and Folder Descriptions

**Main Project Files**

- `server.js`: Main application file. Configures Express, middleware, sessions, EJS, application routes, and the server's listening port.
- `package.json`: Contains project information, installed dependencies, and application scripts.
- `package-lock.json`: Records the exact dependency versions installed for the project.
- `.env`: Stores private configuration settings, database credentials, login credentials, and session secrets. This file must never be uploaded to GitHub.
- `.gitignore`: Prevents private or unnecessary files, such as `.env` and `node_modules/`, from being tracked by Git.

**Database Folder**

- `db/database.js`: Creates and exports the PostgreSQL connection pool. Selects the local database or Supabase connection based on the `USE_SUPABASE` environment variable.

**Routes Folder**

- `routes/auth.js`: Handles user login, credential verification, session creation, and logout.
- `routes/countries.js`: Handles country-related routes and database operations, including viewing, adding, editing, and deleting records. Also protects the country management pages with login authentication.

**Views Folder**

- `views/index.ejs`: Login page.
- `views/welcome.ejs`: Welcome page displayed after successful login.
- `views/countries.ejs`: Displays the country records and provides record management options.
- `views/add-country.ejs`: Form for adding a new country.
- `views/edit-country.ejs`: Form for editing an existing country.
- `views/map.ejs`: Displays the country map page.

**Public Folder**

- `public/css/styles.css`: Contains the application's styling.
- `public/js/main.js`: Contains browser-side JavaScript.
- `public/images/`: Stores images used by the application.

## Application Routes

The following routes are used by the application:

| HTTP Method | Route | Purpose |
|---|---|---|
| GET | `/` | Displays the login page. |
| POST | `/login` | Processes login credentials and creates a session when successful. |
| GET | `/welcome` | Displays the welcome page after login. |
| GET | `/logout` | Ends the current login session. |
| GET | `/countries` | Displays all country records. |
| GET | `/countries/add` | Displays the add-country form. |
| POST | `/countries/add` | Inserts a new country record. |
| GET | `/countries/edit/:id` | Retrieves and displays a country for editing. |
| POST | `/countries/edit/:id` | Updates an existing country record. |
| POST | `/countries/delete/:id` | Deletes a country record. |

The country management routes require an authenticated session. Users who are not signed in are redirected to the login page.

## CRUD Operations

The application uses CRUD operations to manage country records.

### Create

A user completes the add-country form and submits it. The server receives the form data and executes an SQL `INSERT` statement to add the new record to the database.

### Read

The application executes a SQL `SELECT` statement to retrieve country records and displays the results on the country list page.

### Update

A user selects an existing country to edit. The application retrieves the selected record using its `country_id`, displays the current values in a form, and saves changes using an SQL `UPDATE` statement.

### Delete

A user selects a country to delete. The application uses the selected record's `country_id` in an SQL `DELETE` statement to remove the record.

Database queries use parameterized values rather than directly inserting user-submitted text into SQL statements.

## Installation and Local Setup

### Requirements

Before running the application, install:

- Node.js
- npm
- PostgreSQL
- pgAdmin
- Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/countrygirlaz06/CountryCatalog.git
```

Navigate into the project folder:

```bash
cd CountryCatalog
```

### 2. Install Dependencies

```bash
npm install
```

This installs the packages listed in `package.json`.

### 3. Create the Local Database

Using PostgreSQL or pgAdmin, create a database named:

```text
country_catalog
```

Run the following SQL statement to create the country table:

```sql
CREATE TABLE country (
    country_id INTEGER GENERATED ALWAYS AS IDENTITY
        (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    country_name VARCHAR(30) NOT NULL,
    popular_site VARCHAR(50) NOT NULL,
    capital VARCHAR(30) NOT NULL,
    population INTEGER NOT NULL CHECK (population >= 0),
    visited VARCHAR(1) CHECK (visited IN ('Y', 'N'))
);
```

### 4. Configure Environment Variables

Create a `.env` file in the project's root directory.

For a local PostgreSQL setup, configure the following variables:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5433
DB_NAME=country_catalog
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

LOGIN_USERNAME=your_login_username
LOGIN_PASSWORD=your_login_password
SESSION_SECRET=your_private_session_secret

USE_SUPABASE=false
NODE_ENV=development
```

Replace the example values with your own credentials.

**Important:** The local database port shown above is `5433` because that was the port used during development. If your PostgreSQL installation uses another port, update `DB_PORT` accordingly.

Never commit the `.env` file or share its contents publicly.

### 5. Start the Application

Run:

```bash
npm start
```

The application should start at:

```text
http://localhost:3000
```

If a different port is assigned, use the address shown in the terminal.

## Supabase Database Configuration

The deployed application uses Supabase to host its PostgreSQL database.

To configure a Supabase connection:

1. Create a Supabase project.
2. Create the `country` table using the SQL statement provided above.
3. Open the project's database connection settings.
4. Obtain the Session Pooler connection URI.
5. Add the database connection URI to the hosting environment variables as `DATABASE_URL`.
6. Set `USE_SUPABASE=true`.

The application uses `db/database.js` to determine which database connection to use.

When `USE_SUPABASE=false`, the application uses the local PostgreSQL settings.

When `USE_SUPABASE=true`, the application uses the Supabase connection URI.

Database passwords and connection strings should always remain private.

## Deployment

The application is deployed using Railway and uses Supabase for its online database.

### GitHub

The source code is maintained in the following repository:

[Country Catalog GitHub Repository](https://github.com/countrygirlaz06/CountryCatalog)

Git is used to track changes, create commits, and push updates to GitHub.

Common Git commands:

```bash
git status
git add .
git commit -m "Describe your changes"
git push
```

### Railway

Railway hosts the Node.js application.

The project is connected to its GitHub repository so code updates can be deployed from GitHub.

The `package.json` file includes the following start script:

```json
"scripts": {
    "start": "node server.js"
}
```

Railway uses the start script to launch the application.

The server uses:

```js
const PORT = process.env.PORT || 3000;
```

This allows Railway to provide the port used by the deployed application.

### Production Environment Variables

The following variables must be configured in Railway's environment variable settings:

| Variable | Purpose |
|---|---|
| `LOGIN_USERNAME` | Website login username. |
| `LOGIN_PASSWORD` | Website login password. |
| `SESSION_SECRET` | Private secret used for session management. |
| `DATABASE_URL` | Supabase PostgreSQL connection URI. |
| `USE_SUPABASE` | Set to `true` to use Supabase. |
| `NODE_ENV` | Set to `production`. |

Do not put actual credentials or secrets in this README.

## Testing Checklist

Before considering the application complete, verify the following:

- [ ] The home page loads.
- [ ] An incorrect login displays an error.
- [ ] A correct login successfully creates a session.
- [ ] The welcome page displays after login.
- [ ] The country list displays database records.
- [ ] A new country can be added.
- [ ] An existing country can be edited.
- [ ] A country can be deleted.
- [ ] The map page loads correctly.
- [ ] Logout successfully ends the session.
- [ ] Visiting a protected country route after logout redirects to the login page.
- [ ] The application works using the online Supabase database.
- [ ] The deployed Railway website loads and functions correctly.
- [ ] Private credentials are not included in the GitHub repository.

## Important Notes

- The `.env` file contains private credentials and must remain excluded from Git.
- The `node_modules/` folder should not be uploaded to GitHub. It can be recreated by running `npm install`.
- The local PostgreSQL database and Supabase database are separate. Changes to one do not automatically appear in the other.
- When changing environment variables, restart the local server so the new settings are loaded.
- When changing application code, save the files, test locally, commit the changes, and push them to GitHub.
- The deployed application uses Railway's assigned `PORT` and the Supabase database connection.

## Project Purpose and Learning Outcomes

This project provided experience building a full-stack web application and connecting multiple technologies.

Key concepts practiced include:

- Creating and organizing a Node.js project.
- Installing and managing npm dependencies.
- Building an Express server.
- Creating and using application routes.
- Rendering dynamic webpages with EJS.
- Handling HTML form submissions.
- Connecting an application to PostgreSQL.
- Writing SQL queries for CRUD operations.
- Using parameterized queries.
- Implementing login authentication and session management.
- Managing private configuration with environment variables.
- Using Git and GitHub for source control.
- Connecting an online database through Supabase.
- Deploying a Node.js application through Railway.

---

**Repository:** [CountryCatalog](https://github.com/countrygirlaz06/CountryCatalog)
