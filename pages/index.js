import {useState,useEffect} from "react";
import {listenDataItems} from '../Firebase/GetProducto'
import ProductImg from '../Components/ProductImg'
export default function Home() {
  const [ rowProducto, setRowProducto ] = useState([])
  useEffect(()=>{
    listenDataItems(newData=>{setRowProducto(newData)})
  },[])
  console.log(rowProducto)
  return (
    <div>
      <main className="app-container">
      <div >
      {
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
      }
      </div>
      </main>
    </div>
  )
}
