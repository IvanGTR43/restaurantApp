import app from 'firebase/compat/app';
import 'firebase/compat/database';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.database = app.database();
  }
}

const firebase = new Firebase();
export default firebase;
