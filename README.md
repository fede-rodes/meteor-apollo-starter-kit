# Meteor + Apollo boilerplate

A simple kit to start experimenting with Apollo, Meteor and React.

Code is deployed here: https://meteor-apollo-starter.herokuapp.com/

### Includes
- GraphQL server running with Express bound to the Meteor app
- Apollo client
- React
- Accounts password & facebook auth
- ES6 syntax
- ant design
- basscss

Check `package.json` for specific versions

### Running it

```
meteor npm install
meteor --settings settings-dev.json
```

GraphiQL is enabled at [/graphiql](http://localhost:3000/graphiql).

### Folder structure
    .
    ├── client                  # Client files
    │   ├── styles              # Styles
    │   ├── main.html           # First loaded view pulling from imports
    │   └── main.js             # Imports all required files - React render
    ├── imports                 # A client/server folder
    │   ├── api                 #
    │   |  └── schema.js        # Schema & query definitions
    |   └── ui                  # UI React rendering
    │      └── App.js           # Component using `graphql` HOC
    │      └── Header.js        # Basic presentational component
    │      └── Loading.js       # Reusable loading component
    │      └── LoginForm.js     # Component using `withApollo` HOC
    ├── server                  # Server files
    │   └── server.js           # Main server file initiating Apollo server
    └── package.json            # node dependencies


### Learn more

- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)

Source: https://blog.meteor.com/create-a-simple-hello-world-app-with-meteor-and-apollo-64bab66a456f

### Configure facebook account
https://medium.com/@jaaaco/add-facebook-login-to-meteor-app-in-2-minutes-3c744b46009e

### Deploy to heroku
```
1. git clone https://github.com/fede-rodes/meteor-apollo-starter-kit.git
2. cd meteor-apollo-starter-kit
3. heroku login (enter your credentials)
4. heroku create <YOUR_APP_NAME>
5. heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
6. heroku addons:create mongolab
OR
6. heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
7. heroku config:set ROOT_URL=https://<YOUR_APP_NAME>.herokuapp.com
8. heroku config:add METEOR_SETTINGS="$(cat settings.json)"
9. git push heroku mongo:master
10. heroku open
```

TODO:
- if services === password, add check at loggedInRoute and display/redirect to
 ConfirmEmailPage if email is not verified.
- fix FB login for style equals to 'redirect'
- Accounts.config from Meteor.docs
- postcss
- less / sass
- styledComponents / css-modules
- PWA
- tests
