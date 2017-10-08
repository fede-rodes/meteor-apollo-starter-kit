# Meteor + Apollo boilerplate

A simple kit to start experimenting with Apollo, Meteor and React.

### Includes
- GraphQL server running with Express bound to the Meteor app
- Apollo client
- React
- Accounts UI, Basic & password
- ES6 syntax

Check `package.json` for specific versions

### Running it

```
meteor npm install
meteor
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

TODO:
- Collection2 schema
- graphql file extension
- login with email
- smtp config
- wrapper component for routes (AuthRoute, PublicRoute, ...), see TheMeteorChef
- fix FB login for style equals to 'redirect'
- Deployment / setup automatic deploys
- use compose for withRouter, withApollo, ...
- Accounts.config from Meteor.docs

CUSTOM TODO:
- integrate with antd
- integrate with basscss
- postcss
- less / sass
