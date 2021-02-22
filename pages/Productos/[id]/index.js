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
  const [Logo, setLogo ] = useState('');
  const [telefono, setTelefono ] = useState('');
  const [urlActual, setUrlActual]= useState('')
  const [descuento, setDescuento] = useState('')
  useEffect(() => {
    if (typeof window !== "undefined") {
      const URLLocation = window.location.href;
      let urlactual = URLLocation.slice(32);
      setUrlActual(urlactual)
     productosUnicosDeEmpresa(urlactual).then((doc) => {
        //Extraer el correo
        setEmpresa(doc.data().nameEmpresa)
        setLogo(doc.data().imageLogo)
        setDireccion(doc.data().direccionEmpresa)
        setTelefono(doc.data().numberEmpresa)
        const emailEmpresa = doc.data().emailEmpresa;
        setUrlImage(doc.data().imageEmpresa);
        setEmpresaEmail(empresaEmail)
        DataEmpresaProducto(emailEmpresa).onSnapshot(({docs})=>{
          const  arrayData = docs.map(dataProducto)
          setProductos(arrayData)
  
         })
          
      });
    }
  }, []);

console.log(productos)
  return (
    <>
  <div className="global-container-product">
            
    <Heroe Image={urlImage} Empresa={Empresa} Direccion={Direccion} imageLogo={Logo} telefono={telefono} />
    <h1 className="producto-title">Productos de {Empresa}</h1>
    <div className="grid-empresa">
      {
        
          productos.map(producto =>
          <CardProduct 
            Empresa={Empresa}
            empresaEmail={empresaEmail}
            nombreProducto={producto.nombreProducto}
            Precio = {producto.precioVentaProducto}
            imgProducto= {producto.imageProducto}
            cantidad={producto.cantidadProducto}
            urlActual= {urlActual}
            descuento = {producto.descuentoProducto}


            /> )
        
      } 
      </div>
    </div>
    </>
  );
}
