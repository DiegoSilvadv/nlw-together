import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyDofkv2PBaJiHeGdQxNPk5Ychd0PvVIwmM",
    authDomain:"letmeask-c76ef.firebaseapp.com" ,
    databaseURL:"https://letmeask-c76ef-default-rtdb.firebaseio.com" ,
    projectId:"letmeask-c76ef" ,
    storageBucket:"letmeask-c76ef.appspot.com" ,
    messagingSenderId: "913079324947" ,
    appId: "1:913079324947:web:3211697b940e426b1ccae6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { auth, database, firebase}  

