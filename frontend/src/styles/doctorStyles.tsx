import { createStyles, makeStyles } from "@material-ui/core";

export const doctorHeader = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiToolbar-regular': {
        backgroundColor: theme.palette.primary.light,
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.secondary.main,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.secondary.main,
    },
  }),
);

export const useDoctorStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    height: window.innerHeight - (64 as number),
    color: 'white'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  drawerClose: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiTabs-scrollable': {
      width: 0,
    }
  },
  drawerOpen: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiTabs-scrollable': {
      width: '100%',
      marginLeft: '9px',
      marginRight: '10px',
    }
  },
  tabPanels: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    maxHeight: window.innerHeight - (64 as number)
  },
  tabStyle: {
    '& .MuiTab-wrapper': {
      fontSize: '1.5em',
    }
  }
}));

export const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  paperStylePatientsList: {
    maxHeight: window.innerHeight - (320 as number),
    backgroundColor: theme.palette.primary.light,
    width: '1600px',
    margin: 'auto',
  },
  titleBackgroundColorDoctor: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  medicineListStyle: {
    maxHeight: window.innerHeight - (320 as number),
    width: '1000px',
    margin: 'auto',
  },
  buttColorDoctor: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main
  },
  buttAlignment: {
    margin: 'auto',
  },
  paperStyleCaregiverAccDetails: {
    backgroundColor: theme.palette.primary.light,
  },
  listStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  text: {
    color: 'white',
    fontSize: '1.5em'
  },
  '& .MuiTableCell-root': {
    fontSize: 'none'
  },
  butt: {
    marginTop: '0px',
    '& .makeStyles-baseButton-27': {
      marginTop: '0px'
    },
    '& .makeStyles-baseButton-28': {
      marginTop: '0px'
    }
  },
  accDetailsStyle: {
    marginTop: '100px',
    width: '500px',
    margin: 'auto',
  },
  titleText: {
    color: '#C37510',
    '& .MuiTypography-displayBlock': {
      color:'white'
    },
  }
}));