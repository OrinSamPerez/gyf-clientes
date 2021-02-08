import { useState, useEffect } from "react";
import Heroe from '../../../Components/Heroe'
import CardProduct from '../../../Components/cardProduct'
import {
  productosUnicosDeEmpresa,
  DataEmpresaProducto,
  dataProducto,
} from "../../../Firebase/GetProducto";

export default function Productos() {
  const [empresaEmail, setEmpresaEmail] = useState('')
  const [productos, setProductos] = useState([ ]);
  const [urlImage, setUrlImage] = useState('');
  const [Empresa, setEmpresa] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Descripcion, setDescripcion ] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const URLLocation = window.location.href;
      let urlactual = URLLocation.slice(32);
     productosUnicosDeEmpresa(urlactual).then((doc) => {
        //Extraer el correo
        setEmpresa(doc.data().Empresa)
        setDescripcion(doc.data().Descripcion)
        setDireccion(doc.data().Direccion)
        const emailEmpresa = doc.data().Correo;
        setUrlImage(doc.data().urlImage);
        setEmpresaEmail(empresaEmail)
        DataEmpresaProducto(emailEmpresa).onSnapshot(({docs})=>{
          const  arrayData = docs.map(dataProducto)
          setProductos(arrayData)
  
         })
          
      });
    }
  }, []);

  return (
    <>
  <div className="global-container-product">
    <Heroe Image={urlImage} Empresa={Empresa} Direccion={Direccion} Descripcion={Descripcion}/>
    <h1 className="producto-title">Productos de {Empresa}</h1>
    <div className="grid-empresa">
      {
        
          productos.map(producto =>
          <CardProduct 
            Empresa={Empresa}
            Direccion={Direccion}
            empresaEmail={empresaEmail}
            nombreProducto={producto.nombreProducto}
            Precio = {producto.Precio}
            imgProducto= {producto.imgProducto}

            /> )
        
      } 
      </div>
    </div>
    </>
  );
}
