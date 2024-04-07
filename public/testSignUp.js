import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { 
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

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

const createAccount = async () => {
    const loginEmail = document.getElementById("emailSignup").value;
    const loginPassword = document.getElementById("passwordSignup").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }
    catch (error) {
        console.log(error);
        showLoginerror(error);
    }
}
  
  document.getElementById("signupButton").addEventListener("click", createAccount);
  
  function showLoginerror (error) {
    document.getElementById("signupErrorDiv").style.visibility = "visible";
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      document.getElementById("signupErrorMessage").innerHTML = "Wrong password. Try again.";
    }
    else {
      document.getElementById("signupErrorMessage").innerHTML = `Error: ${error.message}`;
    }
}