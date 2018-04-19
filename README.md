# Calobox

## Project Structure

1. /db ~ Contains migrations and seeds for the database (using knex as an ORM).
2. /emailTemplates ~ Contains email templates used while sending emails (using nodemailer to send emails).
3. /public ~ Contains jQuery scripts (app.js for the entire app, cart.js for only cart related stuff) as well as a lot of        images.
4. /routes ~ Contains part of backend routes. staticPages.js contains the routes for all the completely static pages.
5. /views ~ contains the ejs templates for all the pages of the site, (names should suffice as explanations).
6. knexfile.js ~ Contains knex configurations. Not to be tampered with. (Will have to add a .env file with specific variables    if working on this project).
7. server.js ~ Contains server configurations as well as additional user related and non static routes that handle logins,        signups, displaying certain pages, etc. 

## Node Skeleton

### Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

### Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

### Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
# CaloBox
# CaloBox
