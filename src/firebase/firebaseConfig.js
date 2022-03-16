import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCkd6L4-_sN73EXBq5eVsEv0JJmafVEfio",
    authDomain: "gchgame.firebaseapp.com",
    projectId: "gchgame",
    storageBucket: "gchgame.appspot.com",
    messagingSenderId: "795495414711",
    appId: "1:795495414711:web:07f6c1a2b1ebe0c7",
    measurementId: "G-3K3CS0BW6L"
};




if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, googleAuthProvider, firebase };
