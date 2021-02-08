import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import {listenDataItemsFacturas} from '../Firebase/crearCotizacion'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    paddingLeft:'10px',
    paddingTop:'50px',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function ListaCotizacion() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [ dataItems, setDataItems ] = useState([  ])


  listenDataItemsFacturas()
  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
          }
          label="Contraer lista"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Mostrar detalles"
        />
      </FormGroup>        
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Lista de cotizaciones
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
             
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DraftsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line ite"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              
            </List>
          </div>
        </Grid>

    </div>
  );
}
