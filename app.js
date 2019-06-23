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

  let apps = {};
  let appCollection = db.collection('apps');
  let allApps = appCollection.get()
  .then(snapshot => {
    let i = 0;
    snapshot.forEach(doc => {
      apps[i] = doc.id;
      i++;
    });
  })
  .catch(err => {
    console.log('Erorr getting documents', err);
  });

  app.get('/app', (req,res) => {
    res.json(apps);
  });



  /* ==================================================
   * App => VLC Media Player
   * Endpoint => https://api.wixware.com/app/vlc
   * ================================================== */
  let appVLC;
  let appCollectionVLC = db.collection('apps').doc('VLC');
  let getAppVLC = appCollectionVLC.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        appVLC = doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  app.get('/app/vlc', (req,res) => {
    res.json(appVLC);
  });



  /* ==================================================
   * App => Firefox
   * Endpoint => https://api.wixware.com/app/firefox
   * ================================================== */
   let appFirefox;
   let appCollectionFirefox = db.collection('apps').doc('Firefox');
   let getAppFirefox = appCollectionFirefox.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         appFirefox = doc.data();
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 
   app.get('/app/firefox', (req,res) => {
     res.json(appFirefox);
   });
 
 

  /* ==================================================
   * App => OBS (Open Broadcaster Software)
   * Endpoint => https://api.wixware.com/app/obs
   * ================================================== */
   let appOBS;
   let appCollectionOBS = db.collection('apps').doc('OBS');
   let getAppOBS = appCollectionOBS.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         appOBS = doc.data();
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 
   app.get('/app/obs', (req,res) => {
     res.json(appOBS);
   });
 
 

  /* ==================================================
   * App => Blender
   * Endpoint => https://api.wixware.com/app/blender
   * ================================================== */
   let appBlender;
   let appCollectionBlender = db.collection('apps').doc('Blender');
   let getAppBlender = appCollectionBlender.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         appBlender = doc.data();
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 
   app.get('/app/blender', (req,res) => {
     res.json(appBlender);
   });
 
 

  /* ==================================================
   * App => Audacity
   * Endpoint => https://api.wixware.com/app/audacity
   * ================================================== */
   let appAudacity;
   let appCollectionAudacity = db.collection('apps').doc('Audacity');
   let getAppAudacity = appCollectionAudacity.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
       } else {
         appAudacity = doc.data();
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
 
   app.get('/app/audacity', (req,res) => {
     res.json(appAudacity);
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
