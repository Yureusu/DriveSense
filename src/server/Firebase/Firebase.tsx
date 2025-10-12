import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpLnEBDMz-FXoSYWN9EWsUuMAIu-Dpt9M",
    authDomain: "drivesense-7cac6.firebaseapp.com",
    projectId: "drivesense-7cac6",
    storageBucket: "drivesense-7cac6.firebasestorage.app",
    messagingSenderId: "751400174977",
    appId: "1:751400174977:web:c1d4109794ca4d41bb5480"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
