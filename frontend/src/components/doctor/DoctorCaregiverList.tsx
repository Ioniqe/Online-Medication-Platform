import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { getCaregiversList } from "../../actions/CaregiverAction";
import { PersonWithId } from "../../model/models";
import { useLoginStyles } from "../../styles/loginStyles";
import CaregiverList from "./CaregiverList";
import NewPatientForm from "./NewPersonTypeForm";

interface Props {
  getCaregiversList: () => void,
  caregiversList: {
    loading: boolean,
    people: PersonWithId[],
    error: boolean,
  },
}

function DoctorCaregiverList({ getCaregiversList, caregiversList }: Props) { //list all caregivers in the db
  const classesButton = useLoginStyles();
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCaregiversList()
  }, [getCaregiversList])

  let display = caregiversList.loading ? <h1>Loading</h1> : (caregiversList.error ? <h1>Error</h1> :
    <CaregiverList caregiverList={caregiversList.people} />)

  let handleNewCaregiver = (): void => {
    setOpen(true);
  }
  
  return (
    <>
      <NewPatientForm
        open={open}
        setOpen={setOpen}
        personType='caregiver'
      />
      
      {display}
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          className={`${classesButton.baseButton} ${classesButton.btn1}`}
          onClick={() => handleNewCaregiver()}
          style={{
            width: '150px',
          }}
        >
          New Caregiver
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    caregiversList: state.caregiver //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCaregiversList: () => dispatch(getCaregiversList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCaregiverList);