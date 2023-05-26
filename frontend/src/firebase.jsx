import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAZfmXILSisgVeX7E0f-31skYJWU9X_M8",
  authDomain: "ventures-fe92a.firebaseapp.com",
  projectId: "ventures-fe92a",
  storageBucket: "ventures-fe92a.appspot.com",
  messagingSenderId: "526363112017",
  appId: "1:526363112017:web:adebd7b73a2764eb19fe70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, app, provider}