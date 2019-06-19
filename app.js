const express = require('express');
const forceDomain = require('forcedomain');
const path = require('path');

const app = express();

app.use(forceDomain({
  hostname: 'api.wixware.com',
  protocol: 'https'
}));

// Serve the static files from React App
app.use(express.static(path.join(__dirname, 'docs/build')));

// Firebase dependencies
const admin = require('firebase-admin');

// Initializing firebase admin with default project on Google Cloud
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Initializing Firestore
const db = admin.firestore();

/***** API ENDPOINT /get/items *****/

let items = {};

let appsRef = db.collection('apps');
let allApps = appsRef.get()
  .then(snapshot => {
    let i = 0;
    snapshot.forEach(doc => {
      items[i] = doc.id;
      i++;
    });
  })
  .catch(err => {
    console.log('Erorr getting documents', err);
  });

// An api endpoint that returns a list of items (apps)
app.get('/v1/get/app', (req,res) => {
  res.json(items);
});



// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'docs/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port 8080`);
  console.log('Press Ctrl+C to quit.');
});