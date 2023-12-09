import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, getDocs, collection, query, where, updateDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0-VTpe8IZv3A1z1xwc5wNXmnEagfhIP4",
    authDomain: "star-citizen-org-manager.firebaseapp.com",
    projectId: "star-citizen-org-manager",
    storageBucket: "star-citizen-org-manager.appspot.com",
    messagingSenderId: "23119138762",
    appId: "1:23119138762:web:a5adf27b38a5ddebbfc933"
};
  
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth(app)
const storage = getStorage(app)

export {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    storage,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    updateDoc
}
