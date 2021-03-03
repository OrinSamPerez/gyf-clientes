import {useState} from 'react'
import Button from '@material-ui/core/Button'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import {firebaseG} from '../Firebase/FirebaseConf'
import 'react-toastify/dist/ReactToastify.css';
const db = firebaseG.firestore();
export default function CardProduct(props){
  const valueInitial = {
    urlEmpresa:'',
    cantidadSeleccionada:0,
    precio:0,
    nameEmpresa:'',
    productoEmpresa:'',
    descuento:'',
    estado:'No Enviada',
    empresaEmail: props.empresaEmail
    
  }
  const [values, setValues] = useState(valueInitial)

    const handleChange =(e)=>{
      const {name, value}=e.target
      setValues({...values, [name]:value})
    }

    const handleSubmit = ()=>{
      values.precio = props.Precio;
      values.urlEmpresa = props.urlActual;
      values.nameEmpresa= props.Empresa;
      values.productoEmpresa =props.nombreProducto;
      values.descuento = props.descuento
      if(values.cantidadSeleccionada >= 1 && values.cantidadSeleccionada <= 9 ){
        values.cantidadSeleccionada = (`0${values.cantidadSeleccionada}`)
      }
      if(values.cantidadSeleccionada === 0){
        values.cantidadSeleccionada = 1
      }
      if(values.cantidadSeleccionada <= props.cantidad){
        firebaseG.auth().onAuthStateChanged(async (user) =>{
          if(user != null){
          await db.collection(user.email).doc('Facturas-Clientes').collection(values.urlEmpresa).doc().set(values)
          await db.collection(user.email).doc('ListaCotizacion').collection('ListaCotizacion').doc(values.urlEmpresa).set(values)
          setValues(valueInitial)
          toast.success('¡Producto agregado 🛒!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          }
        })

      }
      else{
        toast.error('¡No se puede agregar un numero mayor, a la cantidad existente ⚠️ !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    return(
      <form onSubmit={handleSubmit} > 
        <div class="wrapper-product">
            <div class="container-product">
                <img src={props.imgProducto}/>
                <h1 id="nameProducto">{props.nombreProducto}</h1>
                <h3 >En Stock<span id="nameCantidad"> {props.cantidad}</span></h3> 
                <div>
                 
                <input onChange={handleChange} id="cantidad-seleccionada" name="cantidadSeleccionada" type="number" placeholder=" 1 " min="1" max={props.cantidad}/>
                  { <h3> <span id="precio">$ {props.Precio}</span></h3>}
                  
                  <Button onClick={handleSubmit} variant="text" color="default">
                    <AddShoppingCartIcon style={{fontSize:40}}/>
                  </Button>
                </div>
              </div> 
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
      </form>

    )
}