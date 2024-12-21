import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey:FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_SENDER_ID,
    appId: FB_APP_ID,
    measurementId: FB_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
