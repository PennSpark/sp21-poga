  import firebase from 'firebase/app';
  import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDo_6kHYc9D-NRBlcTXmG6P50fXw1suHJw",
    authDomain: "poga-b039e.firebaseapp.com",
    projectId: "poga-b039e",
    storageBucket: "poga-b039e.appspot.com",
    messagingSenderId: "225045847112",
    appId: "1:225045847112:web:1dd47a385b9dda21764c7d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   const projectStorage = firebase.storage();
//   const projectFirestore = firebase.firestore();

  export default firebase;