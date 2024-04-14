// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { 
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendSignInLinkToEmail,
  sendEmailVerification
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
  const loginEmail = document.getElementById("emailSignup").value;
  const loginPassword = document.getElementById("passwordSignup").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)

    await sendEmailVerification(auth.currentUser);
  }
  catch (error) {
    console.log(error);
    showSignupError(error);
  }
}

document.getElementById("signupButton").addEventListener("click", createAccount);

function showLoginerror (error) {
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    document.getElementById("loginErrorMessage").innerHTML = "Wrong password. Try again.";
  }
  else {
    document.getElementById("loginErrorMessage").innerHTML = `Error: ${error.message}`;
  }
}

function showSignupError (error) {
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    document.getElementById("signupErrorMessage").innerHTML = "Wrong password. Try again.";
  }
  else {
    document.getElementById("signupErrorMessage").innerHTML = `Error: ${error.message}`;
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user && document.getElementById("usernameSignup").value != "") {
      updateProfile(auth.currentUser, {
        displayName: document.getElementById("usernameSignup").value,
        })
        .then(() => {
          document.getElementById("username").innerHTML = user.displayName;
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
      hideElements(user);
      document.getElementById("userEmail").innerHTML = user.email;
      document.getElementById("username").innerHTML = user.displayName;
      console.log(user);
    }
    else if (user) {
      hideElements(user);
      document.getElementById("userEmail").innerHTML = user.email;
      document.getElementById("username").innerHTML = user.displayName;
      console.log(user);
    }
    else {
      document.getElementById("acctDiv").style.visibility = "hidden";
      document.getElementById("unverifiedDiv").style.visibility = "hidden";
      document.getElementById("loginDiv").style.visibility = "visible";
    }
  })
}

function hideElements (user) {
  if (user.emailVerified == false) {
    document.getElementById("unverifiedDiv").style.visibility = "visible";
  }
  else {
    document.getElementById("acctDiv").style.visibility = "visible";
    document.getElementById("unverifiedDiv").style.visibility = "hidden";
  }
  document.getElementById("signupDiv").style.visibility = "hidden";
  document.getElementById("loginDiv").style.visibility = "hidden";
  document.getElementById("loginErrorMessage").innerHTML = "";
  document.getElementById("signupErrorMessage").innerHTML = "";
  document.getElementById("signupDiv").style.visibility = "hidden";
  document.getElementById("usernameSignup").value = "";
  document.getElementById("emailSignup").value = "";
  document.getElementById("passwordSignup").value = "";
  document.getElementById("emailSignIn").value = "";
  document.getElementById("passwordSignIn").value = "";
}

monitorAuthState();

const logout = async () => {
  await signOut(auth);
}

document.getElementById("logoutButton1").addEventListener("click", logout);
document.getElementById("logoutButton2").addEventListener("click", logout);