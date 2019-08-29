# README

* Ruby version: ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]

* Deployment instructions:
```
  rails db:migrate db:seed
  rails s -p 3001
  npm install
  cd FuelTrackerApp
  npm run start
```

* Development Logbook (contents to be transcribed in this README) 
https://docs.google.com/spreadsheets/d/1hs8iJfz_pEagrzLUYfqFdCA7fLmpi7Kl0VBIq3hdaPE/edit?usp=drivesdk

* To-do

- Add specs for react
- Use semantic-ui for Home, auth components, and Refuel History form
- Replace Axios calls with Redux
- Refactor registration form component to use a custom hook
