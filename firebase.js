import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_-31iOxixCWqn_tgzMi2qDNBiK4Ug38E",
  authDomain: "dxn-new.firebaseapp.com",
  projectId: "dxn-new",
  storageBucket: "dxn-new.appspot.com",
  messagingSenderId: "324350592599",
  appId: "1:324350592599:web:3793670202ec1999f08512",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
