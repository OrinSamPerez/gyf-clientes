import {firebaseG} from '../Firebase/FirebaseConf'

const db = firebaseG.firestore()

let collectionDB = db.collection("Proucto-Global")


const getDataFirebase = (doc) => {
    const data = doc.data();
    const { id } = doc.id;
    const {Descripcion, Correo, Precio, Proveedor, Empresa, Direccion,urlImage, Numero}= data
    return {
        urlImage,
        Descripcion, 
        Direccion,
        Correo, 
        Precio,
        id,
        Proveedor,
        Empresa,
        Numero
    };
  };
  
  
  export const listenDataItems = (callback) => {
    
        return collectionDB.onSnapshot(({ docs }) => {
          const newData = docs.map(getDataFirebase);
          callback(newData);
  
  
        });
      }

  
 
  //Extraer productos, de cada usuario
  export const productosUnicosDeEmpresa = (URLactual)=>{
    const docProductos = collectionDB.doc(URLactual).get();
    return docProductos
  }

  
export const dataProducto = (doc) => {
  const { Precio, imgProducto, nombreProducto }= doc.data();
  return { Precio, imgProducto, nombreProducto  }
};
  export const DataEmpresaProducto = (emailEmpresa,callback) => {
        
        return db.collection(emailEmpresa).doc('Producto').collection('Producto')
      }