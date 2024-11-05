import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB8P4Tv3KO16VxekOfSYpRI0ZAWhghN3j8",
  authDomain: "firstfirebaseproject-e362a.firebaseapp.com",
  databaseURL: "https://testfb8-a772e.firebaseapp.com",
  projectId: "firstfirebaseproject-e362a",
  storageBucket: "firstfirebaseproject-e362a.appspot.com",
  messagingSenderId: "26917379474",
  appId: "1:26917379474:web:90355aa5db3ed1bcb8354b",
};

let app;

if(!firebase.apps.length){
  alert("initialising");
  app = firebase.initializeApp(firebaseConfig);

}
else{
  alert("app length" + firebase.apps.length)

}
const db = firebase.firestore();
export { db };

