import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABFzIEzUI8Iyk1VesbenPypNIDv_DtwFY",
  authDomain: "movie-theaters-92b7e.firebaseapp.com",
  projectId: "movie-theaters-92b7e",
  storageBucket: "movie-theaters-92b7e.appspot.com",
  messagingSenderId: "389140123634",
  appId: "1:389140123634:web:4eb448fe1a721c2598e56b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);