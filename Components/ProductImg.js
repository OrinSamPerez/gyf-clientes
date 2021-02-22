import {useState} from 'react'
import Link from 'next/link' 
export default function ProductImg(props) {
  const [productoG, setProductoG] =  useState('')
  const empresaLink = props.empresa.replace(/\s+/g, '');
  const direccion = props.Direccion.replace(/\s+/g, '');
 const enviarDatosActuales= ()=>{setProductoG(props.Correo)}
 const NumeroTelefono = props.Numero
 let numeroT =  ((NumeroTelefono.length)-4)
 let urlNumero =  NumeroTelefono.slice(numeroT) 

  return (
    <>
        <style jsx
        >{
            `#percentuale{
            width:300px;
            height: 60px;
            right: 0px;
            top: 3px;
            position:absolute;
            background-image: url('${props.image}');
            background-position: center;
            background-size: cover;
            }
            #left{
              
              height: 400px;
              background-image: url('${props.image}');
              background-position: center;
              background-size: cover;
            }
            .logo{ 
              width:150px;
              height:150px;
              text-align:center;
              border-radius:50%;
            }
            h2{
              font-size:40px;
              text-align:center;
            }

            `
        }
        </style>
        <a  onClick={enviarDatosActuales}>
        <Link href={`Productos/${empresaLink}-${direccion}-${urlNumero}`}>
      <section id="card-city">
        <div id="left">
          <div id="left-bottom">
            <h2> {props.empresa} </h2>
            <nav id="cityguide">
              <img
                id="book"
                src="https://imageshack.com/a/img924/663/WsByrZ.png"
                alt=""
              />
              <a id="guide"> Ver productos </a>
            </nav>
          </div>
        </div>
        <div id="right">
          <div id="right_top">

            <h2> {props.empresa} </h2>
            <div id="circle"></div>
            <div class="squares" id="square_topdx"></div>
            <div class="squares" id="square_topsx"></div>
            <div class="squares" id="square_bottomsx"></div>
            <div class="squares" id="square_bottomdx"></div>
          </div>
          <div id="right_middle">
            <p id="text">
            <img className="logo" src={props.logo}/>
            <h3>Direccion:</h3> <span> {props.Direccion}</span> <br></br>
            <h3>Numero:</h3> <span>{props.Numero} </span>         

            </p>
            <div id="line"></div>
            <div id="big_circle"></div>
            <div id="small_circle"></div>
          </div>
          <div class="little_dots" id="dot1">
            {" "}
          </div>
          <div class="little_dots" id="dot2">
            {" "}
          </div>
          <div class="little_dots" id="dot3">
            {" "}
          </div>
        </div>
      </section>
      </Link>
      </a>
    </>
  );
}
