import React,{useState,useEffect} from "react";
import Link from 'next/link'
import Button from '@material-ui/core/Button'

export default function TablaShop(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const fecha = new Date();
    const [hora, setHora] = useState()

    const horaActual = (`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`)
    setTimeout(()=>{
        setHora(horaActual)
    },1000)
    return(
        <>
              <div className="products products-table">

<div class="cart-page product">
  <div class="cart-page-container">
    <div class="cart-page-header">
      <div class="cart-header-footer">
        <Link href="/" class="cart-header-cta" target="_blank">Continuar buscando</Link>
      </div>
    </div>
    <div class="cart-page-header page-order-received">
      <div class="cart-header-notice">
        <span class="cart-header-icon"><i class="fa fa-check" aria-hidden="true"></i></span>
        <span class="cart-header-text">Gracias. Por ordenar con nosotros.</span>
      </div>
      <div class="cart-order-received">
        <div class="order-received-col received-col-mobile">
          <span class="">Fecha:</span>
          <span class="bold-text">{meses[fecha.getMonth()]} {fecha.getDay()}, {fecha.getFullYear()}</span>
          <span class="bold-text">{hora}</span>
        </div>
        <div class="order-received-col">
          <span class="">Empresa:</span>
          <span class="bold-text">$100</span>
        </div>
        <div class="order-received-col">
          <span class="">Total:</span>
          <span class="bold-text">$100</span>
        </div>
      </div>
    </div>


    <div class="cart-page-table">
      <table class="cart-table-product">
        <thead>
          <tr class="cart-table-header">
            <th class="cart-table-img">Empresa</th>
            <th class="cart-table-desktop cart-table-product-name">Producto</th>
            <th class="cart-table-desktop cart-table-payment">Descripcion</th>
            <th class="cart-table-desktop cart-table-size">Precio</th>
            <th class="cart-table-desktop cart-table-small-size"></th>
          </tr>
        </thead>

        <tbody>
          {/* {
            rowItem.map(row=>
              <tr class="cart-table-content cart-table-content-detail-payment">
            <td class="cart-table-desktop red-text bold-text">{row.titulo}</td>
            <td class="cart-table-desktop"><span class="bold-text"></span></td>
            <td class="cart-table-desktop">Anytime</td>
            <td class="cart-table-desktop">{row.precio}</td>
            <td class="cart-table-icon red-text right-text-mobile"><i class="fa fa-close"></i></td>
          </tr>
  
            )
          } */}
          <tr class="cart-table-mobile">
            <td class="red-text bold-text">Accounting Cerfiticate</td>
            <td class="right-text-mobile">$100</td>
          </tr>
          <tr class="cart-table-mobile">
            <td colspan="2"><span class="cart-table-mobile-title bold-text">Payment Type: </span><span>Pay Upfront</span></td>
          </tr>
          <tr class="cart-table-mobile">
            <td colspan="2"><span class="cart-table-mobile-title cart-table-mobile-title-bottom bold-text">Start Date: </span><span>Anytime</span></td>
          </tr>
          <tr class="cart-table-content cart-table-payment-content">
            <td class="cart-table-payment-detail" colspan="6">
              <div class="cart-table-plan-payment">
                <div class="cart-plan-payment-container">
                  <table>
                    <tr>
                      <td class="cart-table-desktop cart-table-image-info"></td>
                      <td><span class="bold-text"></span>$49</td>
                      <td><span class="bold-text">Repayments of: </span>$49 x 32 Weeks</td>
                      <td><span class="bold-text">Starting on: </span>Thursday, 26  2018</td>
                      <td><span class="bold-text">Total Amount: </span>$1.568</td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-block-right">
      <div class="cart-table-bill">
        <div class="bill-sub">Subtotal: $1.00</div>
        <div class="bill-total bold-text">Subtotal: $1.00</div>
      </div>
      <div class="cart-header-footer">
        <Button variant="contained" color="primary">
          Crear cotizacion
        </Button>
      </div>
    </div>
  </div>
</div>
      </div>
        </>
    )
}