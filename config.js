import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBhbCT9fxvCXtBMPezEPF0QdQnANF9xrbQ",
  authDomain: "santa-52756.firebaseapp.com",
  databaseURL: "https://santa-52756.firebaseio.com",
  projectId: "santa-52756",
  storageBucket: "santa-52756.appspot.com",
  messagingSenderId: "810658914443",
  appId: "1:810658914443:web:755dbe734d60cdb28f348e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
