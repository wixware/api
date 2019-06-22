const express = require('express');
const forceDomain = require('forcedomain');
const cors = require('cors');
const path = require('path');

const app = express();


/* Redirects the address wixwareapi.appspot.com to api.wixware.com */
app.use(forceDomain({
  hostname: 'api.wixware.com',
  protocol: 'https'
}));


/*
  For now, we're allowing everyone to fetch from
  api.wixware.com. But in the future we may restrict
  CORS to the registered users only.
*/
app.use(cors());


/* Serving the documentation from React build */
app.use(express.static(path.join(__dirname, 'docs/build')));

/* Importing Firebase dependencies */
const admin = require('firebase-admin');

/* Initializing Firebase Admin from Google Cloud
Project's default credentials*/
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

/* Initializing Google Firestore */
const db = admin.firestore();








/***** API ENDPOINTS *****/




  /* 
    Endpoint => https://api.wixware.com/app

    This endpoint returns a list of all appps and their 
    general information. For now, we're only returning a
    list of apps and no other information about the apps.
  */

  let Apps = {};
  let AppCollection = db.collection('apps');
  let allApps = AppCollection.get()
  .then(snapshot => {
    let i = 0;
    snapshot.forEach(doc => {
      Apps[i] = doc.id;
      i++;
    });
  })
  .catch(err => {
    console.log('Erorr getting documents', err);
  });

  app.get('/app', (req,res) => {
    res.json(Apps);
  });



  /* ===========================================
   * App => VLC Media Player
   * Endpoint => https://api.wixware.com/app/vlc
   *
   ============================================ */
  let AppVLC;
  let AppCollectionVLC = db.collection('apps').doc('VLC');
  let getAppVLC = AppCollectionVLC.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        AppVLC = doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  app.get('/app/vlc', (req,res) => {
    res.json(AppVLC);
  });



  /* ===========================================
   * App => Mozilla Firefox
   * Endpoint => https://api.wixware.com/app/firefox
   *
   ============================================ */
   let AppFirefox;
   let AppCollectionFirefox = db.collection('apps').doc('Firefox');
   let getAppFirefox = AppCollectionFirefox.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         AppFirefox = doc.data();
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 
   app.get('/app/firefox', (req,res) => {
     res.json(AppFirefox);
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