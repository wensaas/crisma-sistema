const firebaseConfig = {
  apiKey: "AIzaSyCbg3EMttXQlcL8VrAT2XIDiDv6TyzKP2I",
  authDomain: "crismatienda-6cabf.firebaseapp.com",
  projectId: "crismatienda-6cabf",
  storageBucket: "crismatienda-6cabf.firebasestorage.app",
  messagingSenderId: "106650850972",
  appId: "1:106650850972:web:706edbafb78fa5371fbf59"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
