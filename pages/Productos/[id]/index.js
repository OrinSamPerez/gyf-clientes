import { useState, useEffect } from "react";
import Heroe from '../../../Components/Heroe'
import CardProduct from '../../../Components/cardProduct'
import {
  productosUnicosDeEmpresa,
  DataEmpresaProducto,
  dataProducto,
} from "../../../Firebase/GetProducto";
import Head from 'next/head'
import SearchIcon from '@material-ui/icons/Search';
export default function Productos() {
  const [empresaEmail, setEmpresaEmail] = useState('')
  const [productos, setProductos] = useState([ ]);
  const [urlImage, setUrlImage] = useState('');
  const [Empresa, setEmpresa] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Logo, setLogo ] = useState('');
  const [telefono, setTelefono ] = useState('');
  const [urlActual, setUrlActual]= useState('')
  const [searchArray,setSearchArray ] = useState([])
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
        setEmpresaEmail(doc.data().emailEmpresa)
        DataEmpresaProducto(emailEmpresa).onSnapshot(({docs})=>{
          const  arrayData = docs.map(dataProducto)
          setProductos(arrayData)
  
         })
          
      });
    }
  }, []);

  const changeSEARCH = (e)=>{
    let palabraBuscar = e.target.value
    let numeroPalabraBuscar = palabraBuscar.length;

    const result = productos.filter(word => {
      const PalabraProducto = word.nombreProducto; 
      const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
      return caracterPalabrasActual.toLowerCase()  === palabraBuscar.toLowerCase() 
    })
    setSearchArray(result)
  }
  return (
    <>
  <Head>
    <title>{Empresa}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <div className="searchGlobal">
    <form>
      <input name="search" onChange={changeSEARCH} type="text" placeholder="Buscar productos aqui..."/>
    </form>
    <div className="searchIcon"><SearchIcon/></div>
  </div>
  <div className="global-container-product">
            
    <Heroe Image={urlImage} Empresa={Empresa} Direccion={Direccion} imageLogo={Logo} telefono={telefono} />
    <h1 className="producto-title">Productos de {Empresa}</h1>
    <div className="grid-empresa">
      {
        searchArray.length === 0?
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
        :searchArray.map(producto =>
          <CardProduct 
            Empresa={Empresa}
            empresaEmail={empresaEmail}
            nombreProducto={producto.nombreProducto}
            Precio = {producto.precioVentaProducto}
            imgProducto= {producto.imageProducto}
            cantidad={producto.cantidadProducto}
            urlActual= {urlActual}
            descuento = {producto.descuentoProducto}


            /> 
            )
        
      } 
      </div>
    </div>
    </>
  );
}
