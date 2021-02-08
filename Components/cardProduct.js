import {useState} from 'react'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { sendCotizacion } from '../Firebase/crearCotizacion';
export default function CardProduct(props){
  const agregarItems = ( )=>{

     const Cantidad = document.getElementById('cantidad-seleccionada').value 
     const Empresa = props.Empresa
     const Direccion = props.Direccion
     const emailEmpresa =  props.empresaEmail
     const Precio = props.Precio 
     const nombreProducto = props.nombreProducto
     sendCotizacion(Cantidad, Empresa, Direccion,emailEmpresa, Precio, nombreProducto)
  }

    return(
        
        <div class="wrapper-product">
            <div class="container-product">
                <img src={props.imgProducto}/>
                <h1>{props.nombreProducto}</h1>
  
                <div>
                <input  id="cantidad-seleccionada" type="number" placeholder="Cantidad" min="1"/>
                  { <h3> <span>$ {props.Precio}</span></h3>}
                  <Button onClick={agregarItems} variant="text" color="default">
                    <AddShoppingCartIcon style={{fontSize:40}}/>
                  </Button>
                </div>
              </div> 
          </div>

    )
}