import {useState,useEffect} from "react";
import {listenDataItems} from '../Firebase/GetProducto'
import SearchIcon from '@material-ui/icons/Search';
import ProductImg from '../Components/ProductImg'
import Head from 'next/head'
export default function Home() {
  const [searchArray,setSearchArray ] = useState([])
  const [ rowProducto, setRowProducto ] = useState([])
  useEffect(()=>{
    listenDataItems(newData=>{setRowProducto(newData)})
  },[])
  const changeSEARCH = (e)=>{
    let palabraBuscar = e.target.value
    let numeroPalabraBuscar = palabraBuscar.length;

    const result = rowProducto.filter(word => {
      const PalabraProducto = word.nameEmpresa; 
      const caracterPalabrasActual = PalabraProducto.substr(0,numeroPalabraBuscar) 
      return caracterPalabrasActual.toLowerCase()  === palabraBuscar.toLowerCase() 
    })
    setSearchArray(result)
  }
  return (
    <div>
    <Head>
      <title>Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className="app-container">
    <div className="searchGlobal">
      <form>
        <input onChange={changeSEARCH} type="text" placeholder="Buscar empresa aqui..."/>
      </form>
      <div className="searchIcon"><SearchIcon/></div>
    </div>
      <div >
      {
        searchArray.length === 0?
        rowProducto.map(row=>
          <ProductImg 
          title={row.nombreProducto}
          empresa={row.nameEmpresa}
          descripcion={row.Descripcion}
          image={row.imageEmpresa}
          Correo={row.Correo}
          logo={row.imageLogo}
          Direccion={row.direccionEmpresa}
          proveedor={row.Proveedor}
          Numero = {row.numberEmpresa}
          />

        )
      :searchArray.map(row=>
          <ProductImg 
          title={row.nombreProducto}
          empresa={row.nameEmpresa}
          descripcion={row.Descripcion}
          image={row.imageEmpresa}
          Correo={row.Correo}
          logo={row.imageLogo}
          Direccion={row.direccionEmpresa}
          proveedor={row.Proveedor}
          Numero = {row.numberEmpresa}
          />

        )
      }
      </div>
      </main>
    </div>
  )
}
