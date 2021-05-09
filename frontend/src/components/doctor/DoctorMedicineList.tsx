import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getMedicines } from "../../actions/MedicineListAction";
import { MedicationWithId } from "../../model/models";
import { useLoginStyles } from "../../styles/loginStyles";
import MedicineList from "./MedicineList";
import NewMedicineForm from "./NewMedicineForm";
import NewSideEffectForm from "./NewSideEffectForm";

interface Props {
  getMedicineList: () => void,
  medicineList: {
    loading: boolean,
    medicine: MedicationWithId[],
    error: boolean,
  },
}

function DoctorMedicineList({ medicineList, getMedicineList }: Props) { //list all medicines in the db
  const classesButton = useLoginStyles();

  const [openMedForm, setOpenMedForm] = useState(false);
  const [openSideEffForm, setOpenSideEffForm] = useState(false);

  useEffect(() => {
    getMedicineList()
  }, [getMedicineList])

  let display = medicineList.loading ? <h1>Loading</h1> : (medicineList.error ? <h1>Error</h1> :
    <MedicineList medicineList={medicineList.medicine} />)

  let handleNewMedicine = (): void => {
    setOpenMedForm(true);
  }

  let handleNewSideEffect = (): void => {
    setOpenSideEffForm(true);
  }

  return (
    <>
      <NewMedicineForm
        open={openMedForm}
        setOpen={setOpenMedForm}
      />

      <NewSideEffectForm
        open={openSideEffForm}
        setOpen={setOpenSideEffForm}
      />

      {display}
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          className={`${classesButton.baseButton} ${classesButton.btn1}`}
          onClick={() => handleNewMedicine()}
          style={{
            width: '150px',
            margin: '10px'
          }}
        >
          New Medicine
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`${classesButton.baseButton} ${classesButton.btn1}`}
          onClick={() => handleNewSideEffect()}
          style={{
            width: '150px',
            margin: '10px'
          }}
        >
          New Side Effect
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    medicineList: state.medicine //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMedicineList: () => dispatch(getMedicines()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMedicineList);