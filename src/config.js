import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC1309HWLRw9bdAZogke0nT8jtgN9UW4CI",
    authDomain: "testing-firebase-43172.firebaseapp.com",
    databaseURL: "https://testing-firebase-43172.firebaseio.com",
    projectId: "testing-firebase-43172",
    storageBucket: "testing-firebase-43172.appspot.com",
    messagingSenderId: "469567477475",
    appId: "1:469567477475:web:a61e6284d6db4de504d7d6",
    measurementId: "G-QB69WSW8RJ"
  };

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
