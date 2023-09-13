import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDAenugpjUo1dv7KtN-Eh5LowzdAGeO84s",
  authDomain: "ibvc-foto.firebaseapp.com",
  projectId: "ibvc-foto",
  storageBucket: "ibvc-foto.appspot.com",
  messagingSenderId: "340948932112",
  appId: "1:340948932112:web:1772ca9a63fbd595cf5c95",
  measurementId: "G-DHTY14DSW4"
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;