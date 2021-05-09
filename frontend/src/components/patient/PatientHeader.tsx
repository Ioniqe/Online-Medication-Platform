import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';
import { patientHeader } from '../../styles/patientStyles';

interface Props{
  drawerStyle: string,
  setDrawerStyle: (style: string) => void,
}

function PatientHeader({ drawerStyle, setDrawerStyle }:Props) {
  const classes = patientHeader();
  const history = useHistory();

  let logout = (): void => {
    localStorage.removeItem('user');
    history.push('/');
  }

  let handleDrawer = (): void => {
    let style = (drawerStyle === "makeStyles-drawerClose-7") ? "makeStyles-drawerOpen-8" : "makeStyles-drawerClose-7";
    setDrawerStyle(style);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Patient
          </Typography>
          <Button color="secondary" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PatientHeader;