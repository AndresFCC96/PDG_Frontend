// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const environment = {
  firebase: {
    projectId: 'betleague-af205',
    appId: '1:19634567986:web:916260f3061ae05621b52b',
    storageBucket: 'betleague-af205.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCxL-7ZmsAOsBO_vU7F_5Rm7-1ItdkGSrc',
    authDomain: 'betleague-af205.firebaseapp.com',
    messagingSenderId: '19634567986',
    measurementId: 'G-B6TRLTQLWN',
  },
  UrlBase: 'https://betleague-backend.herokuapp.com',
  isLogged: false,
  production: true
};

const firebaseApp = initializeApp(environment.firebase);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
