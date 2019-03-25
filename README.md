## Google OAuth

## Passport

- Website for [PassportJS](http://www.passportjs.org/) middleware that we will be using to streamline authentication (using various strategies)
- Install via `npm install passport`

### Google OAuth Strategy

- Install the strategy via `npm install passport-google-oauth20@2 --save`; this is required because of fixes made to account for the deprecation of the Google+ service
- Using OAuth requires a project be setup, etc., using the [Google Developer's Console](https://console.developers.google.com)

### Heroku

- When deploying, simply issue `git push heroku master` to propagate to Heroku. Make sure that the heroku CLI is installed
