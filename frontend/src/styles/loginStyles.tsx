import { makeStyles } from "@material-ui/core";

export const useLoginStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '7%'
  },
  newPatientFormStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '30%',
    marginTop: theme.spacing(1),
  },
  typography: {
    color: theme.palette.secondary.main,
  },
  baseButton: {
    border: 'none',
    marginTop: 20,
    width: "100%",
    height: 48,
    borderRadius: 6,
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: '#fff',
    backgroundSize: '200%',
    transition: '0.4s',
    '&:hover': {
      backgroundPosition: 'right'
    }
  },
  btn1: {
    backgroundImage: 'linear-gradient(45deg, #C37510 10%, #E89931 80%)'
  },
  btn2: {
    backgroundImage: 'linear-gradient(45deg, #232426 10%, #191A1C 80%)'
  },
  link: {
    marginTop: 20,
    width: '100%',
    color: 'white'
  },
  textField: {
    color: 'white',
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },
  notchedOutline: {
    borderWidth: '2px',
    borderColor: 'white !important',
    color: 'white',
  },
  formControl: {
    color: 'white',
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: 'white',
        borderWidth: '2px'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        borderWidth: '2px'
      },
    },
  },
  popupColor: {
    backgroundColor: theme.palette.primary.main
  },
  popupButt: {
    width: '70%',
    boxShadow: 'none',
    margin: 'auto'
  },
  popupTextColor: {
    color: 'white'
  },
  text: {
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
  },

}));