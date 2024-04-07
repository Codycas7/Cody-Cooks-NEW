// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { 
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQiD0QmWyl_-4SHfUoFFsILPxJ8F5tHKA",
  authDomain: "cody-cooks.firebaseapp.com",
  databaseURL: "https://cody-cooks-default-rtdb.firebaseio.com",
  projectId: "cody-cooks",
  storageBucket: "cody-cooks.appspot.com",
  messagingSenderId: "860432436020",
  appId: "1:860432436020:web:85e4d60215347948ea7361",
  measurementId: "G-571J7ECW9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
  const loginEmail = document.getElementById("emailSignIn").value;
  const loginPassword = document.getElementById("passwordSignIn").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch (error) {
    console.log(error);
    showLoginerror(error);
  }
}

document.getElementById("loginButton").addEventListener("click", loginEmailPassword);

const createAccount = async () => {
  const loginEmail = document.getElementById("emailSignIn").value;
  const loginPassword = document.getElementById("passwordSignIn").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch (error) {
    console.log(error);
    showLoginerror(error);
  }
}

function showLoginerror (error) {
  document.getElementById("loginErrorDiv").style.visibility = "visible";
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    document.getElementById("loginErrorMessage").innerHTML = "Wrong password. Try again.";
  }
  else {
    document.getElementById("loginErrorMessage").innerHTML = `Error: ${error.message}`;
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
    }
    else {
      console.log("fail");
    }
  })
}

monitorAuthState();