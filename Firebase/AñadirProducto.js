import { firebaseG } from "./FirebaseConf";
const db = firebaseG.firestore();
var userEmail = "orlin@gmail.com";
var collectionDB;

//Comprobando datos
firebaseG.auth().onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email;
    collectionDB = db.collection(userEmail).doc("ListItem");
  } else {
    console.log("Espera");
  }
});

export const datosItems = (titulo, descripcion, precio, correo,proveedor) => {
  collectionDB
    .collection("ListItem-1")
    .doc()
    .set({ titulo, descripcion, precio,correo,proveedor })
    .then(function () {});
};

const getDataFirebase = (doc) => {
  const data = doc.data();
  const { titulo, descripcion, precio, urlImage,proveedor, correo } = data;
  return {
    titulo,
    descripcion,
    precio,
    urlImage,
    proveedor,
    correo
  };
};


export const listenDataItems = (callback) => {
  firebaseG.auth().onAuthStateChanged((user) => {
    if (user) {
      userEmail = user.email;
      collectionDB = db.collection(userEmail).doc("ListItem");
      return collectionDB.collection("ListItem-1").onSnapshot(({ docs }) => {
        const newData = docs.map(getDataFirebase);
        callback(newData);


      });
    }
  });
};
