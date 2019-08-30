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
let app = firebase.initializeApp(firebaseConfig);

const db = app.database();
const burgersRef = db.ref('burgers');
const images_container = db.ref('images_container');
const images_approved = db.ref('images_approved');
const images_rejected = db.ref('images_rejected');
const images = db.ref('images');

export {
    firebase,
    db,
    burgersRef,
    images_container,
    images_approved,
    images_rejected,
    images
};