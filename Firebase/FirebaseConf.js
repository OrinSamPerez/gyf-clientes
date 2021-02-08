import firebase from 'firebase';
import "firebase";


  var firebaseConfig = {
    apiKey: "AIzaSyA_12EKG4v8eIprK54y6_OaAYKhRrYaOJw",
    authDomain: "sistema-gestion-6b6c0.firebaseapp.com",
    projectId: "sistema-gestion-6b6c0",
    storageBucket: "sistema-gestion-6b6c0.appspot.com",
    messagingSenderId: "479409184064",
    appId: "1:479409184064:web:4b99bde7dcfa38a599aea5",
    measurementId: "G-T3F5WZKT3W",
  };
  // Initialize Firebase
 
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  //Variables de logeo globales
  var providerApple = new firebase.auth.OAuthProvider('apple.com');

  //Logearse con Faveook
  export const singInApple =()=>{
    firebase
  .auth()
  .signInWithPopup(providerApple)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    firebase.auth().signInWithRedirect(providerApple);
    return console.log('user')

 
  })
  .catch((error) => {
    console.log(error)
  });

  }
  //Logearse con google
export const singInGoogle =()=>{
  const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const {name} = true
      return { name }
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
export const firebaseG = firebase;