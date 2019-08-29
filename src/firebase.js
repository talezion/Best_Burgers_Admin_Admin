import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA_n8zAZIEIxbegQpaDRcPuM3BaXm1Apr4",
    authDomain: "burgers-best-stage.firebaseapp.com",
    databaseURL: "https://burgers-best-stage.firebaseio.com",
    projectId: "burgers-best-stage",
    storageBucket: "burgers-best-stage.appspot.com",
    messagingSenderId: "1089706900218",
    appId: "1:1089706900218:web:eeda4bc080b7ea5f"
};
firebase.initializeApp(firebaseConfig);
export default firebase;