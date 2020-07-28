import firebase from 'firebase'

/*const firebaseConfig = {
    apiKey: "AIzaSyA_n8zAZIEIxbegQpaDRcPuM3BaXm1Apr4",
    authDomain: "burgers-best-stage.firebaseapp.com",
    databaseURL: "https://burgers-best-stage.firebaseio.com",
    projectId: "burgers-best-stage",
    storageBucket: "burgers-best-stage.appspot.com",
    messagingSenderId: "1089706900218",
    appId: "1:1089706900218:web:eeda4bc080b7ea5f"
};*/
var firebaseConfig = {
  apiKey: 'AIzaSyD7O7AFOSV-Oubp2AckMif9YsYDI7KVzzk',
  authDomain: 'best-burgers-app-debug.firebaseapp.com',
  databaseURL: 'https://best-burgers-app-debug.firebaseio.com',
  projectId: 'best-burgers-app-debug',
  storageBucket: 'best-burgers-app-debug.appspot.com',
  messagingSenderId: '242388502735',
  appId: '1:242388502735:web:14bb770b000a8609c04fba',
  measurementId: 'G-WL7DK49K7X'
}
let app = firebase.initializeApp(firebaseConfig)

const db = app.database()
const burgersRef = db.ref('burgers')
const images_container = db.ref('images_container')
const images_approved = db.ref('images_approved')
const images_rejected = db.ref('images_rejected')
const images = db.ref('images')
const users = db.ref('users')

export {
  firebase,
  db,
  burgersRef,
  images_container,
  images_approved,
  images_rejected,
  images,
  users
}
