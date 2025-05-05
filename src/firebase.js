import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAwHDyAQA3zh-fKugf2NisjJiuqvDj8drc",
  authDomain: "cloud-contact-saver.firebaseapp.com",
  projectId: "cloud-contact-saver",
  storageBucket: "cloud-contact-saver.firebasestorage.app",
  messagingSenderId: "705922541331",
  appId: "1:705922541331:web:945f482a60df03e609dce6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app