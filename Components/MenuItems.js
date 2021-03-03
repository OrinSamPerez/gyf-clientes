import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider"
import {listenDataItems} from '../Firebase/AñadirProducto'
import Link from 'next/link'
import InboxIcon from '@material-ui/icons/Inbox';
import Fab from '@material-ui/core/Fab';
import {firebaseG} from '../Firebase/FirebaseConf'
const drawerWidth = "300px";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    left: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function MenuItems({ valorDrawel, buttonList }) {
  const classes = useStyles();
  const [  rowItem, setRowItems] = useState([ ]) 
  //scosnt [ dataItems, setDataItems ] = useState([ ])
  var listOpen = valorDrawel;
  firebaseG.auth().onAuthStateChanged(async user =>{
    if(user != null){
      firebaseG.firestore().collection(user.email).doc('ListaCotizacion').collection('ListaCotizacion').get().then(function(querySnapshot) {
        const docs = []
        querySnapshot.forEach(function(doc) {
          docs.push({...doc.data(),id:doc.id})
        });
        setRowItems(docs)
      });
    }
  
  })


  return (
    <div className={classes.root}>
      <List>
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={listOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <ListItem>{buttonList}</ListItem>
          {
            rowItem.length === 0?
            (<ListItem>
            <ListItemAvatar>
              <Avatar>
                <InboxIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Todavia no hay productos selecionado"  />
          </ListItem>)
          :(
            rowItem.map(row =>
            <>
              <Link href="/Shop">
                <ListItem>
                <ListItemAvatar>
                  <Avatar color="primary">
                  <InboxIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={row.id} secondary={row.estado} />
              </ListItem>
              </Link>
              <Divider/>
            </>
             )
          )
          } 

        </Drawer>
      </List>
    </div>
  );
}
