# Meteor + Apollo boilerplate

A simple kit to start experimenting with Apollo, Meteor and React.

Code is deployed here: https://meteor-apollo-starter.herokuapp.com/

Lighthouse audit:
![meteor-apollo-starterkit-lighthouse](https://user-images.githubusercontent.com/16927407/32450606-f0650318-c314-11e7-9a75-3b3ec3d21c6d.png)

### Includes
- GraphQL server running with Express bound to the Meteor app
- Apollo client
- React 16
- Redux
- Meteor accounts (password & facebook)
- ES6 syntax
- [styled components](https://youtu.be/qu4U7lwZTRI)
- ant design
- sanitize.css
- basscss
- PWA, see:
- https://github.com/NitroBAY/meteor-service-worker
- https://github.com/saurshaz/pwa-meteor/blob/master/client/serviceWorker.js
- https://www.made-on-mars.com/blog/how-to-pwa-an-introduction-on-progressive-web-app-and-a-tutorial-to-create-one-with-full-features-push-notification-service-worker-offline-mode/

### Running it
```
meteor npm install
meteor --settings settings-dev.json
```

GraphiQL is enabled at [/graphiql](http://localhost:3000/graphiql).

### Folder structure (TODO)
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

### Lighthouse
```
npm install -g lighthouse
lighthouse http://localhost:3000
```
Run Lighthouse on authenticated app:
```
lighthouse https://user:password@my.domain.com
```

### TODO LIST
- if services === password, add check at loggedInRoute and display/redirect to
 ConfirmEmailPage if email is not verified.
- fix FB login for style equals to 'redirect'
- Accounts.config from Meteor.docs
- When user signs up, sendVerificationEmail shouldn't block user to access home.
In case of error, should feedback on home screen
- tests
- dynamic imports
- bundle-visualizer to see what is taking up the most memory.
- ssr to speed-up first load and SEO
- css outside imports folder (lazy load) is better for performance?
- react helmet
