import { firebaseG } from "./FirebaseConf";

const db = firebaseG.firestore();
var userEmail = "orlin@gmail.com";
var collectionDB;

//Comprobando datos
firebaseG.auth().onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email;
    collectionDB = db.collection(userEmail);
  } else {
    console.log("Espera");
  }
});


//Enviar para cotizar
export const sendCotizacion = (
  Cantidad,
  Empresa,
  Direccion,
  emailEmpresa,
  Precio,
  nombreProducto
) => {
  collectionDB
    .doc("Facturas")
    .collection(`Facturas-${Empresa}`)
    .doc(nombreProducto)
    .set({ Empresa, Cantidad, Direccion, emailEmpresa, Precio, nombreProducto })
    .then(function () {});
};
//getDataCotizacion
const getDataFirebase = (doc) => {
  const data = doc.data();
  const {
    Cantidad,
    Empresa,
    Direccion,
    emailEmpresa,
    Precio,
    nombreProducto,
  } = data;
  return {
    Cantidad,
    Empresa,
    Direccion,
    emailEmpresa,
    Precio,
    nombreProducto,
  };
};
export const listenData = (callback) => {
  firebaseG.auth().onAuthStateChanged((user) => {
    if (user) {
      userEmail = user.email;
      return collectionDB = db.collection(userEmail).doc("Facturas").onSnapshot(({ docs }) => {
        const newData = docs.map(getDataFirebase);
        callback(newData);


      });
    }
  });
};

//Extraer ID facturas
export const listenDataItemsFacturas = () => {
  firebaseG.auth().onAuthStateChanged((user) => {
    if (user) {
      userEmail = user.email;
      db.collection('perezorlin@gmail.com')
      .onSnapshot(function(doc) {
        return console.log("Current data: ", doc);
    });
    }
  });
};
