import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MedicineList from './MedicineList';
import { connect } from 'react-redux';
import { getMedsWithSideEffects } from '../../actions/MedicineListAction';
import { MedicationWithSideEffectsListWithId } from '../../model/models';
import { medicineListStyles } from '../../styles/medicineListStyles';

interface Props {
  medListId: string,
  setOpenMedList: (open: string) => void,
  backgroundStyle: string,
  buttColor: string,
  backgroundColor: string,

  getMedsListWithSideEffects: (medPlanId: string) => void,
  medListWithSideEffects: {
    loading: boolean,
    meds: MedicationWithSideEffectsListWithId[],
    error: boolean,
  }
}

function MedicineListPopup({ medListId, setOpenMedList, backgroundStyle, buttColor, backgroundColor, getMedsListWithSideEffects, medListWithSideEffects }: Props) {
  const theme = useTheme();
  const classes = medicineListStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    medListId !== "" &&  getMedsListWithSideEffects(medListId)
   }, [medListId, getMedsListWithSideEffects]);

  const handleClose = () => {
    setOpenMedList("");
  };

  const medList = medListWithSideEffects.loading ? <h1>Loading</h1> : (medListWithSideEffects.error ? <h1>Error</h1> : <MedicineList medList={medListWithSideEffects.meds}/>)

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={(medListId.length > 0)}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={classes.medListPopupBackground}
      >
        <DialogTitle id="responsive-dialog-title" className={backgroundStyle}>Medicine List</DialogTitle>
        <DialogContent className={`${classes.containerSize} ${classes.listStyle}`}>
          {medList}
        </DialogContent>
        <DialogActions className={backgroundColor}>
          <Button autoFocus onClick={handleClose} className={buttColor}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    medListWithSideEffects: state.medListReducer //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMedsListWithSideEffects: (medPlanId: string) => dispatch(getMedsWithSideEffects(medPlanId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicineListPopup);