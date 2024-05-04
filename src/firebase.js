import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBcgFXbrSUT4nFSQb9Agr4iMyx3NmnGAJU",
  authDomain: "netflix-clone-77b6e.firebaseapp.com",
  projectId: "netflix-clone-77b6e",
  storageBucket: "netflix-clone-77b6e.appspot.com",
  messagingSenderId: "615092887289",
  appId: "1:615092887289:web:bf0f06ff8cf1ce7e708c28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      AuthProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success();
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    signOut(auth);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { auth, db, login, signup, logout };
