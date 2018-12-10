export const env = 'development';
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
};

export default { env, firebaseConfig, reduxFirebase };
