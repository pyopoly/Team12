//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Speficies which firebase project your application is connected with.
//---------------------------------------------------------------------
    
  var firebaseConfig = {
    apiKey: "AIzaSyBdBMvmyQQvDUE7yQK8kypXmL8Xko7SJhw",
    authDomain: "studybuddy-ce7e9.firebaseapp.com",
    databaseURL: "https://studybuddy-ce7e9.firebaseio.com",
    projectId: "studybuddy-ce7e9",
    storageBucket: "studybuddy-ce7e9.appspot.com",
    messagingSenderId: "288586368350",
    appId: "1:288586368350:web:c13d8a08c9249b15cbbbcf",
    measurementId: "G-VYXB59FGNZ"
  };
    
  
  
  // Initialize Firebase
  // Henceforce, any reference to the database can be made with "db"
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();