import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDPAMa-tpwJNEkn68NkosTxrRErTwD3mWU",
    authDomain: "whatsappme-85b71.firebaseapp.com",
    projectId: "whatsappme-85b71",
    storageBucket: "whatsappme-85b71.appspot.com",
    messagingSenderId: "978068457184",
    appId: "1:978068457184:web:b70393be11966427caf285"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{ auth , provider};
  export default db;