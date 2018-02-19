# Meteor, Apollo, React, PWA, Styled-Components boilerplate

A simple kit to start experimenting with Apollo, Meteor, React, PWA and Styled Components.

Code is deployed here: https://meteor-apollo-starter.herokuapp.com/

Lighthouse audit:
![meteor-apollo-light-house](https://user-images.githubusercontent.com/16927407/33520209-a856dc66-d7b6-11e7-9b6c-acc36ea2ee4f.png)

### This project includes the following libraries/functionality
- GraphQL server running with Express bound to the Meteor (1.6.1) app
- Apollo 2
- React 16
- Redux
- Authentication: password & facebook (via meteor accounts)
- ES6 syntax
- styled components
- Progressive Web App features: service-worker, caching, add to home screen, push notifications
- Storybook
- sanitize.css
- basscss

### Step by step guide to get started with this boilerplate

#### 1. Clone the project and install NPM dependecies:
```
git clone https://github.com/fede-rodes/meteor-apollo-starter-kit.git
cd meteor-apollo-starter-kit/
meteor npm install
```

#### 2. Create your settings.json file:
Create a new file called ```settings.json``` based on the provided ```settings.sample.json```.

#### 3. Register the app on Mailgun:
Mailgun will allow you to use password authentication service and send emails from your app.

In order to get started, first access your [Mailgun](https://www.mailgun.com/) account. Then, grab your sandbox domain smtp username and password and copy said values into your settings.json file. Finally, add your email address to the list of [Auhtorized Recipients](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients).

#### 4. Register the app on Facebook:
Follow [this](https://medium.com/@jaaaco/add-facebook-login-to-meteor-app-in-2-minutes-3c744b46009e) tutorial to register the app on Facebook; this will allow you to use Facebook authentication service. Once you get your appId and secret key, copy said values back into your settings.json file.

#### 5. Setup Push Notifications Service
1. create a new file called ```manifest-pwa.json``` based on the provided ```manifest-pwa.sample.json``` (see ```/public``` folder).
2. get your Google Cloud Message (GCM) server key and sender id from Firebase as follows:
  * first, got to your Firebase account: https://console.firebase.google.com/;
  * click on 'Add project';
  * click on 'settings' ('gear' icon, top left);
  * move to the 'CLOUD MESSAGING' tab at the top;
  * you should be able to see both server key and sender id;
3. copy your sender id to your manifest-pwa.json and your server key to your settings.json ("firebase": { "privateKey": ...);
4. open a terminal and install 'web-push' globally: ```npm i -g web-push```;
5. generate VAPID keys: ```web-push generate-vapid-keys --json```;
6. copy-paste your VAPID keys into your settings.json file;

#### 6. Run the app
That's enough config for today, you should now be able to run the app locally:
```
meteor --settings settings.json
```
GraphiQL should be available at [http://localhost:3000/graphiql](http://localhost:3000/graphiql).

#### 7. Deploy to Heroku
In case you want to deploy the app to Heroku, follow these steps:
```
1. open a new terminal
2. type: 'heroku login' (enter your credentials)
3. heroku create <YOUR_APP_NAME>
4. heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
5. heroku addons:create mongolab
OR
5. heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
6. heroku config:set ROOT_URL=https://<YOUR_APP_NAME>.herokuapp.com
7. heroku config:add METEOR_SETTINGS="$(cat settings.json)"
8. git push heroku master
OR (if you are working on a different branch than master)
8. git push heroku <BRANCH-NAME>:master
9. heroku open
```

### More resources

#### Running storybook
Open a new terminal (the meteor app doesn't need to be running) and type:
```
npm i -g @storybook/cli
npm run storybook
```
Stroybook will be available at [http://localhost:6006/](http://localhost:6006/).

#### Favicon / manifest generator
In order to generate the favicons for your project, you can use the following generator:
https://realfavicongenerator.net/

#### Bundle-visualizer
```
cd meteor-apollo-starter-kit/
meteor --extra-packages bundle-visualizer --production --settings settings.json
```

Then go to: [http://localhost:3000/](http://localhost:3000/)

Finding dependencies:
```
npm ls <lib-name>
```

Before deploying to production, if you used --extra-packages, simply remove bundle-visualizer from the list of included packages and run meteor as normal.

Learn more at:
- https://blog.meteor.com/announcing-meteor-1-5-b82be66571bb
- https://blog.meteor.com/putting-your-app-on-a-diet-with-meteor-1-5s-bundle-visualizer-6845b685a119

#### Look for meteor package dependencies
The following command is handy when trying to reduce your client bundle size and need to identify where the dependencies are coming from.
```
meteor list --tree

OR

for p in `meteor list | grep '^[a-z]' | awk '{sub(/[+*]$/, "", $2);
print $1"@"$2 }'`;
do echo "$p";
meteor show "$p" | grep -E '^  [a-z]';
echo;
done
```
Learn more:
- https://github.com/meteor/meteor/issues/2853#issuecomment-283320603


#### Lighthouse
```
npm install -g lighthouse
# or use yarn:
# yarn global add lighthouse
```

Open a new terminal and run: ```lighthouse http://localhost:3000```

In case you run lighthouse inside the /meteor-apollo-starter-kit app's folder, you'll need to delete the report generated by the audit to avoid a static-html error. See [issue #60](https://github.com/fede-rodes/meteor-apollo-starter-kit/issues/60) for more info

### Further reading: articles, docs and (video) tutorials

#### Meteor Apollo
- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)
- https://blog.meteor.com/create-a-simple-hello-world-app-with-meteor-and-apollo-64bab66a456f

#### Progressive Web Apps / Service Workers
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12
- https://dzone.com/articles/introduction-to-progressive-web-apps-offline-first
- https://dzone.com/articles/introduction-to-progressive-web-apps-instant-loadi
- https://dzone.com/articles/introduction-to-progressive-web-apps-push-notifica
- https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0
- https://www.made-on-mars.com/blog/how-to-pwa-an-introduction-on-progressive-web-app-and-a-tutorial-to-create-one-with-full-features-push-notification-service-worker-offline-mode/
- https://jakearchibald.com/2014/offline-cookbook/
- https://youtu.be/cmGr0RszHc8
- https://classroom.udacity.com/courses/ud899
- https://developers.google.com/web/fundamentals/codelabs/push-notifications/
- https://dzone.com/articles/web-push-notifications-1
- https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea
- https://serviceworke.rs
- https://ada.is/progressive-web-apps-talk/
- https://web-push-book.gauntface.com
- https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
- https://developers.google.com/web/fundamentals/app-install-banners/?hl=en#deferring_or_cancelling_the_prompt
- https://developers.google.com/web/tools/workbox/

#### PWA off-line support
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
- https://codelabs.developers.google.com/codelabs/your-first-pwapp/#1
- https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

#### Service Workers Scripts
- https://github.com/mozilla/serviceworker-cookbook
- https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker
- https://github.com/jakearchibald/isserviceworkerready/tree/gh-pages/demos
- https://github.com/NitroBAY/meteor-service-worker
- https://github.com/saurshaz/pwa-meteor/blob/master/client/serviceWorker.js

#### Dynamic imports
- https://youtu.be/j-WcyAjVceM

#### styled components
- https://youtu.be/qu4U7lwZTRI

#### React
- Render props: https://www.youtube.com/watch?v=BcVAq3YFiuc

#### Testing on real devices
- https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?hl=en

### TODO LIST
- app shell architecture
- off line mode with apollo
- fix facebook config
- replace sw scripts with [sw-precache](https://github.com/GoogleChromeLabs/sw-precache) + [sw-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox) or [workbox](https://github.com/GoogleChrome/workbox)

- tests for sw
- code-splitting
- keep track of visited routes in order to send the user back to the initial page. Additionally, add initial page to the account verification link in order to take the user
 back to the initial page after email account is verified.

 https://github.com/meteor/meteor/blob/devel/packages/server-render/README.md#usage

- tests
- ssr to speed-up first load and SEO
- https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab
- https://www.webpagetest.org
- https://stackify.com/what-is-real-user-monitoring/
