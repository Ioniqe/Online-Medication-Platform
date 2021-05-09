import { makeStyles } from "@material-ui/core";

export const medicineListStyles = makeStyles((theme) => ({
  titleBackgroundColorCaregiver: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  titleBackgroundColorPatient: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  backgroundColor: {
    backgroundColor: theme.palette.primary.main,
  },
  buttColorCaregiver: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.main
  },
  buttColorPatient: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary.main
  },
  listStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  textStyle: {
    color: theme.palette.secondary.main,
    fontSize: '2em',
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  containerSize: {
    height: '500px'
  },
  medListPopupBackground: {
    '& .MuiDialog-paperFullScreen': {
      backgroundColor: theme.palette.primary.main,
    }
  }
  
}));