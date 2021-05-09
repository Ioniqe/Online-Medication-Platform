import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { connect } from 'react-redux';
import { getMedPlans } from '../../actions/MedicalPlanActions';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItemSecondaryAction } from '@material-ui/core';
import { MedPlanWithIntervals } from '../../model/models';
import MedicineListPopup from './MedicineListPopup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      backgroundColor: theme.palette.primary.dark
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      // color: '#B834D9'
    },
    background: {
      backgroundColor: theme.palette.primary.main,
      height: window.innerHeight - (64 as number)
    },
    text: {
      color: '#B834D9',
      '& .MuiTypography-displayBlock': {
        color:'white'
      }
    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  personId: string,
  setOpen: (personId: string) => void,
  titleColor: string,
  backgroundStyle: string,
  titleBackground: string,
  buttColor: string,

  getMedPlansList: (personId: string) => void,
  medPlansList: {
    medPlansLoading: boolean,
    medPlans: MedPlanWithIntervals[],
    medPlansError: boolean
  },
}

function MedPlanPopup({ personId, setOpen, titleColor, backgroundStyle, titleBackground, buttColor, getMedPlansList, medPlansList }: Props) {
  const classes = useStyles();

  const [medListId, setOpenMedList] = useState("");

  useEffect(() => {
    if (personId !== '')
      getMedPlansList(personId);
  }, [getMedPlansList, personId])

  const handleClose = () => {
    setOpen("");
  };

  const handleOpenMedicineListPopup = (medListId: string) => {
    setOpenMedList(medListId);
  };

  const list = medPlansList.medPlansLoading ? <h1>Loading</h1> : (medPlansList.medPlansError ? <h1>Error</h1> : 
    <List className={classes.background}>
      {medPlansList.medPlans.map((medPlan) => {
        const labelId = medPlan.id;
        return (
          <ListItem key={labelId} role={undefined} dense>
            <ListItemText id={labelId} className={classes.text} primary={medPlan.treatmentName}
              secondary={`Treatment Period: ${medPlan.treatmentPeriod} days, 
              Intake interval:  ${(medPlan.startInterval).split('T')[1]} - ${(medPlan.endInterval).split('T')[1]}
            `} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" onClick={() => handleOpenMedicineListPopup(labelId)}>
                <MenuIcon style={{color: 'white'}}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  )

  return (
    <>
      <MedicineListPopup
        medListId={medListId}
        setOpenMedList={setOpenMedList}
        backgroundStyle={titleBackground}
        buttColor={buttColor}
        backgroundColor={backgroundStyle}
      />

      <Dialog fullScreen open={(personId.length > 0)} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
          {/* classes.title   titleColor*/}
            <Typography variant="h6" className={`${classes.title} ${titleColor}`}>
              Medication Plans
            </Typography>
            <IconButton edge="end" onClick={handleClose} aria-label="close" >
              <CloseIcon className={titleColor}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        {list}
      </Dialog>

    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    medPlansList: state.medPlansReducer //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMedPlansList: (personId: string) => dispatch(getMedPlans(personId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedPlanPopup);