import { useState } from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import Badge from "@material-ui/core/Badge";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import Avatar from "@material-ui/core/Avatar";
import Search from "./Search";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import {
  singInGoogle,
  singInApple,
  firebaseG,
} from "../Firebase/FirebaseConf";
import Button from "@material-ui/core/Button";
import MenuItems from "./MenuItems";
import AppleIcon from '@material-ui/icons/Apple';
import { delBasePath } from "next/dist/next-server/lib/router/router";

export default function Navbar({ children }) {
  const [open, openModal] = useState(false);
  const [nameUser,setNameUser ]= useState('')
  const [imagenUser, setImagen ] = useState('')
  const [openOut, openOutModal] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const singInGg = () => {
    singInGoogle()
    
  };
  const singInA = () => {
    singInApple();
    openModal(false);
  };
  const openD = () => {
    setClickOpen(true);
  };
  const close = () => {
    setClickOpen(false);
  };
  const singOut = () => {
    openOutModal(true);
  };
  const closeSeccion = () => {
    firebaseG.auth().signOut().then(console.log("entrar"));
  };
  const closeModalOut = ()=>{
    openOutModal(false);

  }
  // const getDataCotizacion = ()=>{
  //   firebaseG.auth().onAuthStateChanged(async ()=>{
  //     db.collection(user.email).doc('Facturas-Clientes')
  //   })
  // }
  // firebaseG.auth().onAuthStateChanged(user=>{
  //   firebaseG.firestore().collection(user.email).doc('Facturas-Clientes').get().then( datos =>{
  //     setRowItems(datos)
  //   });
  // })
  const bodyButton = (
    <div onClick={close} className="item-4 left-item">
      <li title="Salir de la aplicacion">
        <a>
          <CloseIcon />
        </a>
      </li>
    </div>
  );
  return (
    <>
      <div className="grid-container">
        <div>
          {/* <Search /> */}
          <nav>
            {/* Logica para verificar si dicho usario existe */}
            {firebaseG.auth().onAuthStateChanged(function (user) {
              if (user) {
                var userData = firebaseG.auth().currentUser;
                if(userData != null){
                  var imagenUser = userData.photoURL;
                  var nameUser = userData.displayName;
                  setNameUser(nameUser)
                  setImagen(imagenUser)
                  openModal(false);

                }
                


              
              } else {
                openModal(true);
              }
            })}

            {/* Navbar */}
            <div className="nav-container">
              <div className="item-0">
                <li title={nameUser}>
       
                    <a>
                      <Avatar
                        alt="Orlin Samuel Perez"
                        src={imagenUser}
                      />
                    </a>
   
                </li>
              </div>
              <div className="item-1">
                <li title="Ir a casa">
                  <Link href="/">
                    <a>
                      <HomeIcon />
                    </a>
                  </Link>
                </li>
              </div>
              <div className="item-2">
                <li title="Ir a cotizacion">
                  <Link href="/Shop">
                    <a>
                        <LocalMallIcon />
                    </a>
                  </Link>
                </li>
              </div>
              <div onClick={openD} className="item-3">
                <li title="Ver lista de facturas">
                  <a>
                    <NotificationsActiveIcon />
                  </a>
                </li>
              </div>
              <div onClick={singOut} className="item-4">
                <li title="Salir de la aplicacion">
                  <a>
                    <CloseIcon />
                  </a>
                </li>
              </div>
            </div>
            <MenuItems valorDrawel={clickOpen} buttonList={bodyButton} />
          </nav>
        </div>

        <div className="children-nav">{children}</div>
      </div>

      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="login-Modal">
          <div className="container-modal">
            <div className="shopIcon"><ShoppingCartIcon style={{ fontSize: 100 }}/></div>
           
            <div className="logo-modal"><StorefrontIcon style={{ fontSize: 100 }} /></div>
            <h1>Login</h1>
            <p>Bienvenido a ....</p>

            <Button
              onClick={singInGg}
              size="large"
              variant="contained"
              color="secondary"
            >
              Iniciar COn Google
              <img src="/google-mas.svg" />
            </Button>
            <br></br>
            <br></br>
            <Button
              onClick={singInA}
              size="large"
              variant="contained"
              color="default"
            >
              Iniciar con ICLOUD
              <AppleIcon />
            </Button>
          </div>
        </div>
      </Modal>

      {/*Modal para salir de la app*/}
      <Modal
        open={openOut}
        onClose={closeModalOut}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="salir-container">
          <h1>¿Seguro que deseas salir?</h1>
          <Button onClick={closeModalOut} variant="contained" color="primary">
            Cancelar
          </Button>
          &nbsp; &nbsp;
          <Button onClick={closeSeccion} variant="contained" color="secondary">
            &nbsp;&nbsp; Salir&nbsp; &nbsp;
          </Button>
        </div>
      </Modal>
    </>
  );
}
