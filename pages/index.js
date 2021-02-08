import {useState,useEffect} from "react";
import {listenDataItems} from '../Firebase/GetProducto'

import ProductImg from '../Components/ProductImg'
export default function Home() {
  const [ rowProducto, setRowProducto ] = useState([])
  useEffect(()=>{
    listenDataItems(newData=>{setRowProducto(newData)})
  },[])
  return (
    <div>
      <main className="app-container">
      <div >
      {
        rowProducto.map(row=>
          <ProductImg 
          title={row.nombreProducto}
          empresa={row.Empresa}
          descripcion={row.Descripcion}
          image={row.urlImage}
          Correo={row.Correo}
          Direccion={row.Direccion}
          proveedor={row.Proveedor}
          Numero = {row.Numero}
          />

        )
      }
      </div>
      </main>
    </div>
  )
}
