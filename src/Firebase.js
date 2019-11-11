import firebase from 'firebase';
const config = {
 apiKey: 'xxxxxx',
 authDomain: 'xxxxxx.firebaseapp.com',
 databaseURL: 'https://xxxxxx.firebaseio.com',
 projectId: 'xxxxxx',
 storageBucket: '',
 messagingSenderId: 'xxxxxx',
};
firebase.initializeApp(config);
export default firebase;