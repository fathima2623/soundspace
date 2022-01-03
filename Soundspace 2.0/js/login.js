// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDquNbc161bzsm7TV0XtgDff47nB_K3JE",
  authDomain: "soundemic-4f707.firebaseapp.com",
  databaseURL: "https://soundemic-4f707-default-rtdb.firebaseio.com",
  projectId: "soundemic-4f707",
  storageBucket: "soundemic-4f707.appspot.com",
  messagingSenderId: "446088034759",
  appId: "1:446088034759:web:494df0810824586e2741e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const login = document.getElementById("login");

login.addEventListener("click", (e) => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      alert("User logged in!");

      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: dt,
      });

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    window.location = "../pages/user.html"; //After successful login, user will be redirected to dashboard page
  }
  //  else {
  //   alert('USER NOT SIGNED IN');
  // }
});
