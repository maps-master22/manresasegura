// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ9P5MdZfkMp2CmYnEq0LIAmEjTxGKmrw",
  authDomain: "manresaseg.firebaseapp.com",
  projectId: "manresaseg",
  storageBucket: "manresaseg.appspot.com",
  messagingSenderId: "246890869191",
  appId: "1:246890869191:web:ceb75359b5439cd75fe9e2",
  measurementId: "G-6T53334K6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore();
//const usersRef = db.child("users");









/*
var config = {
    apiKey: "AIzaSyBJ9P5MdZfkMp2CmYnEq0LIAmEjTxGKmrw",
    authDomain: "manresaseg.firebaseapp.com",
    projectId: "manresaseg",
    storageBucket: "manresaseg.appspot.com",
    messagingSenderId: "246890869191",
    appId: "1:246890869191:web:ceb75359b5439cd75fe9e2",
    measurementId: "G-6T53334K6V"
  };
firebase.initializeApp(config);

const dbRef = firebase.database().ref();

const usersRef = dbRef.child("users");
const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
   let user = snap.val();
   let $li = document.createElement("li");
   $li.innerHTML = user.name;
   $li.setAttribute("child-key", snap.key); 
   $li.addEventListener("click", userClicked)
   userListUI.append($li);
});


function userClicked(e) {

    var userID = e.target.getAttribute("child-key");
  
    const userRef = dbRef.child('users/' + userID);
  
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
  
    userRef.on("child_added", snap => {
      var $p = document.createElement("p");
      $p.innerHTML = snap.key + " - " + snap.val()
      userDetailUI.append($p);
    });
  
  }
  */