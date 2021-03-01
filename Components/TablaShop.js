import React,{useState, useEffect} from "react";
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import {firebaseG} from '../Firebase/FirebaseConf'
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { confirmAlert } from 'react-confirm-alert'; // Import
//import {Mailer} from 'react-n'
//import {nodemailer} from 'nodemailer'
import {sendEmail }from '../service/sendEmail'

const db = firebaseG.firestore()

export default function TablaShop(props){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const fecha = new Date();
    const [hora, setHora] = useState()
    const [getItemsData, setGetItemsData] = useState([])

    const horaActual = (`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`)
    setTimeout(()=>{
        setHora(horaActual)
    },1000)
  let TOTAL = 0;
  let SUBTOTAL = 0;
  const getData =()=>{
    firebaseG.auth().onAuthStateChanged(async (user)=>{
      firebaseG.firestore().collection(user.email).doc('Facturas-Clientes').collection(props.id).onSnapshot((querySnapshot)=>{
        const docs = [];
        querySnapshot.forEach(doc =>{
          docs.push({...doc.data(),id:doc.id})
          
        })
        setGetItemsData(docs);
      });
      })
    }
    //Total y subtotal
        getItemsData.map(row=>{
          SUBTOTAL += row.precio * row.cantidadSeleccionada
          TOTAL += ((((row.precio * row.cantidadSeleccionada ) * 18)/100) + (row.precio * row.cantidadSeleccionada)) - (((row.precio * row.cantidadSeleccionada ) * row.descuento)/100 ) 
        })
       

      


    useEffect(()=>{
      getData()
    },[])
    const onDelete = (id) => {
      confirmAlert({
        title: 'Seguro que lo deseas eliminar',
        message: '¿Estas seguro que lo deseas eliminar?.',
        buttons: [
          {
            label: 'Si',
            onClick: () => {
            firebaseG.auth().onAuthStateChanged(async (user) => {
              await db.collection(user.email).doc('Facturas-Clientes').collection(props.id).doc(id).delete();
            })}
          },
          {
            label: 'No',
            onClick: () => console.log('')
          }
        ]
      });
  }
  const onDeleteClick = (id)=>{
    confirmAlert({
      title: 'Seguro que lo deseas eliminar',
      message: '¿Estas seguro que lo deseas eliminar?.',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
          firebaseG.auth().onAuthStateChanged(async (user) => {
              await db.collection(user.email).doc('ListaCotizacion').collection('ListaCotizacion').doc(id).delete();
          })}
        },
        {
          label: 'No',
          onClick: () => console.log('')
        }
      ]
    });
 
  }
  const enviarFactura = async () =>{
    const THEAD = document.querySelectorAll('thead > tr > th ')
    const TBODY = document.querySelectorAll('tbody > tr > td')
    for(let i =0;i<THEAD.length;i++){
      console.log(THEAD[i].outerText)
    }
    for(let i =0;i<TBODY.length;i++){
      console.log(TBODY[i].outerText)
    }

    sendEmail()

  }

    return(
        <>
            <div className="products products-table">

<div className="cart-page product">
  <div className="cart-page-container">
    <div className="cart-page-header">
      <div className="cart-header-footer">
        <Link href="/" className="cart-header-cta" target="_blank">Continuar buscando</Link>
      </div>
    </div>
    <div className="cart-page-header page-order-received">
      <div className="cart-header-notice">
        <span className="cart-header-icon"><i className="fa fa-check" aria-hidden="true"></i></span>
        <span className="cart-header-text">Gracias. Por ordenar con nosotros.</span>
      </div>
      <div className="cart-order-received">
        <div className="order-received-col received-col-mobile">
          <span className="">Fecha:</span>
          <span className="bold-text">{meses[fecha.getMonth()]} /{fecha.getDate()}/ {fecha.getFullYear()}</span>
          <span className="bold-text">Hora: {hora}</span>
        </div>
        <div className="order-received-col">
          <span className="">Empresa:</span>
          <span className="bold-text">{props.id}</span>
        </div>
        <Button onClick={()=> onDeleteClick(props.id)} variant="outlined" color="secondary">
           Elminar factura <RestoreFromTrashIcon />
        </Button>
      </div>
    </div>


    <div className="cart-page-table">
      <table className="cart-table-product">
        <thead>
          <tr className="cart-table-header">
            <th className="cart-table-size">Producto</th>
            <th className=" cart-table-size">Precio</th>
            <th className=" cart-table-size">Cantidad</th>
            <th className=" cart-table-size">Subtotal</th>
            <th className=" cart-table-size">Descuento</th>
            <th className=" cart-table-size">ITBIS</th>
            <th className=" cart-table-size">Total</th>
          </tr>
        </thead>

        <tbody>
         
          {getItemsData.map(row=>
            <tr className="cart-table-content cart-table-content-detail-payment">
            <td className="  bold-text">{row.productoEmpresa}</td>
            <td className="cart-table-size"><span className="">RD$ {row.precio}</span></td>
            <td className="cart-table-size">{row.cantidadSeleccionada}</td>
            <td className="cart-table-size">RD$ {(row.precio * row.cantidadSeleccionada)}</td>
            <td className="cart-table-size">RD$ {((row.precio * row.cantidadSeleccionada ) * row.descuento)/100 }</td>
            <td className="cart-table-sizes">RD$ {(((row.precio * row.cantidadSeleccionada ) * 18)/100)  }</td>
            <td className="cart-table-sizes">RD$ {((((row.precio * row.cantidadSeleccionada ) * 18)/100) + (row.precio * row.cantidadSeleccionada)) - (((row.precio * row.cantidadSeleccionada ) * row.descuento)/100 ) }</td>
           
            <li className=""> 
              <Button onClick={()=>onDelete(row.id)} variant="outlined" color="secondary">
                  <DeleteOutlineIcon color="secondary"/>
              </Button>
             </li>
            <li className="cart-table-icon red-text right-text-mobile"><i className="fa fa-close"></i></li>
          </tr>
  
            )
          } 
          <tr className="cart-table-content cart-table-payment-content">
            <td className="cart-table-payment-detail" colspan="6">
              <div className="cart-table-plan-payment">
                <div className="cart-plan-payment-container">
                  <table>
                    <tr>
                      <td className="cart-table-image-info"></td>
                      <td><span className="bold-text"></span></td>
                      <td><span className="bold-text"> </span></td>
                      <td><span className="bold-text">SubTotal: </span>{SUBTOTAL}</td>
                      <td><span className="bold-text">Total: </span>{TOTAL}</td>
                      <td><span className="bold-text">
                        <Button variant="outlined" color="secondary">
                            Descargar Factura
                        </Button>
                        <Button onClick={enviarFactura} variant="outlined" color="primary">
                          Enviar factura
                        </Button> 
                      </span></td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="cart-block-right">
      <div className="cart-header-footer">
        
      </div>
    </div>
  </div>
</div>
      </div>
        </>
    )
}