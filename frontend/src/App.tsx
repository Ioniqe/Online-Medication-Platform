import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#C37510', //yellow
      main: '#232426', //dark gray
      dark: '#191A1C', //black
      contrastText: '#018A9A', //blue
    },
    secondary: {
      light: '#9F1512', //red
      main: '#FFF', //white
      dark: '#742189', //violet C03DE0
      contrastText: '#388041', //green
    },
  }
});

const useStyles = makeStyles(theme => (
  {
    root: {
      height: "100vh",
      backgroundColor: '#232426',
    },
  }
));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Main/>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
