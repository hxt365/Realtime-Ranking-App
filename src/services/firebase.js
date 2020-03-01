import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCA8TKBNV8fcvy4-NPJ6rJqIxPg_KDwhU0',
  authDomain: 'keyforgehanoi.firebaseapp.com',
  databaseURL: 'https://keyforgehanoi.firebaseio.com',
  projectId: 'keyforgehanoi',
  storageBucket: 'keyforgehanoi.appspot.com',
  messagingSenderId: '71674516423',
  appId: '1:71674516423:web:34314d88df98520e6cffe2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
