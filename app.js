const express = require('express');
const forceDomain = require('forcedomain');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(forceDomain({
  hostname: 'api.wixware.com',
  protocol: 'https'
}));

app.use(cors());

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
let AppData;

  let appRef = db.collection('apps').doc('VLC');
  let getDoc = appRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        AppData = doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

// An api endpoint that returns a list of items (apps)
app.get('/v1/get/app/vlc', (req,res) => {
  res.json(AppData);
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