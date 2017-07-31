Load Github
========================

[![CircleCI](https://circleci.com/gh/gamesover/load-github.svg?style=shield)](https://circleci.com/gh/gamesover/load-github)

For user to load Github user repo list

### Technical Stack  ###

* Frontend is rendered by React (created by `create-react-app`)
* CI is checked by Circle CI
* CD is to deploy to heroku

### Heroku Setup ###

* make sure to bind heroku project with github master, so it will auto CD

### Note ###
* `.circleci/config.yml` for CI
* you need to link github git repository at heroku, so `CD` is also implemented

### Dev Env Setup ###
* `yarn install` to install packages, `yarn start` to start react webpack server
* make sure pass `CI`

### Known Issues ###
* css styles are not perfect
* react form is better to be handled by `redux-form` package

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact