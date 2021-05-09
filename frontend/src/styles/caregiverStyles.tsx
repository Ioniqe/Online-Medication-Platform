import { createStyles, makeStyles } from "@material-ui/core";

export const useCaregiverStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark,
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

export const caregiverHeader = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiToolbar-regular': {
        backgroundColor: theme.palette.secondary.dark,
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

export const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  paperStylePatientsList: {
    maxHeight: window.innerHeight - (300 as number),
    backgroundColor: theme.palette.secondary.dark,
    width: '1000px',
    margin: 'auto',
  },
  paperStyleCaregiversList: {
    maxHeight: window.innerHeight - (320 as number),
    backgroundColor: theme.palette.primary.light,
    width: '1400px',
    margin: 'auto',
  },
  titleBackgroundColorCaregiver: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.main,
    fontSize: '1em',
  },
  buttColorCaregiver: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.main
  },
  paperStyleCaregiverAccDetails: {
    backgroundColor: theme.palette.secondary.dark,
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
    color: '#742189',
    '& .MuiTypography-displayBlock': {
      color: 'white'
    }
  },

}));