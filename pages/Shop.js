import {useState} from 'react';
import Paper from '@material-ui/core/Paper'
import {firebaseG} from '../Firebase/FirebaseConf'
import Avatar from '@material-ui/core/Avatar'
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import TablaShop from '../Components/TablaShop';
//const db = firebaseG.firestore()
export default function Shop(props) {
const [row, setRowItems]= useState([ ])
const [open, setOpen ] = useState(false)
const [currentId, setCurrentId]=useState('')
//const [total, setTotal] = useState('')
//const [subTotal, setSubTotal] = useState('')
//document.title = ('Lista cotizaciones')
firebaseG.auth().onAuthStateChanged(async user =>{
  if(user != null){
    firebaseG.firestore().collection(user.email).doc('ListaCotizacion').collection('ListaCotizacion').get().then(function(querySnapshot) {
      const docs = []
      querySnapshot.forEach(function(doc) {
        docs.push({...doc.data(),id:doc.id})
      });
      setRowItems(docs)
      //console.log(docs[0].estado)
    });
  }

})
const close = ()=>{
  setOpen(false)
}
const tablaData = (id)=>{
  setOpen(true)
  setCurrentId(id)

}
let i = 0;
  return (
    <>
    <Modal
    open={open}
    ><>
    <Button onClick={close} variant="contained" color="secondary">
      Ocultar Ventana
    </Button>
      <TablaShop id={currentId}/>
      </>
    </Modal>

    <div title="Ver detalles de la facturas" >
      <h1>Listado existente de facturas</h1>
      {
        row.length === 0?<h1>Todavia no existe ninguna factura</h1>
        :row.map(datos =>
        <>
          <section>
            <Paper onClick={()=> tablaData(datos.id)} title="Ver detalles de la facturas" elevation={3}>
              <span>
               <Avatar style={{margin:10}}><NotesIcon color="primary" /></Avatar>
                <h3>{datos.id}</h3>
                <li>
                  <Button variant="text" color="primary">
                    <span className="">{row[i].estado}</span>
                  </Button>
                 <div className="noneDiv"> {i++}</div>
                 
                </li>
              </span>
            </Paper>
            
          </section>

          </>
          
        )
        
      }
      <style jsx>{`
      h3{
        color:black;
        padding-left:20px;
        padding-top:15px;
      }
      .noneDiv{
        display:none;
      }
      h1{
        color:black;
        text-align:center;
      }
        div{
          margin-top:70px;
          text-align:center;
          margin-left:auto;
          margin-right:auto;
          width:60%;
        }
        div:hover{
          cursor:grab;
        }
        section{
          margin-top:5px;
          margin-bottom:5px;
        }
        span{
          display:flex;
          margin:5px;
        }
        @media (max-width:850px){
          div{
            width:80%;
          }
        }
        li{
          margin-top:8px;
          margin-left:auto;
        }
        @media (max-width:510px){
          div{
            width:85%;
            margin-right:5px;

            
          }
        }
        @media (max-width:411px){
          div{
            width:85%;
            margin-right:5px;
          }
          h3{
            padding-left:1px;
          }
        }

      `}</style>
    </div>
    </>
  )
  
}
