import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createMedPlan } from '../../actions/MedicalPlanActions';
import { addMedicineToMedList, createMedList } from '../../actions/MedicineListAction';
import { AddMedicineToMedListInterface, CreateMedListInterface, CreateMedPlanInterface, MedicationWithId, MedList, MedPlan } from '../../model/models';

interface Props {
  openUtils: boolean,
  setOpenUtils: (openUtils: boolean) => void,
  personId: string,
  setClose: (close: boolean) => void,

  treatmentPeriod: number,
  treatmentName: string,
  startInterval: string,
  endInterval: string,
  chosenMedicines: MedicationWithId[]

  createMedPlan: (medPlan: CreateMedPlanInterface) => void,
  createdMedPlan: {
    loadingCreate: boolean,
    createdMedPlanId: string,
    errorCreate: boolean,
  }

  createMedList: (medList: CreateMedListInterface) => void,
  createdMedList: {
    loadingCreate: boolean,
    createdMedListId: string,
    errorCreate: boolean,
  }

  addMedicineToMedList: (medList: AddMedicineToMedListInterface) => void,
  addedMeds: {
    loadingAddMedicine: boolean,
    successfulAdd: boolean,
    errorAddMedicine: boolean,
  }
}

function AddMedPlanUtils({ openUtils, personId, createMedPlan, createdMedPlan, createMedList, createdMedList, addMedicineToMedList, addedMeds,
  setClose, setOpenUtils, treatmentPeriod, treatmentName, startInterval, endInterval, chosenMedicines }: Props) {

  const [addedPlan, setAddedPlan] = useState(false);
  const [addedList, setAddedList] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (openUtils) {
      if (addedPlan === false && personId !== "") {
        let medPlan: MedPlan = {
          treatmentPeriod: treatmentPeriod,
          treatmentName: treatmentName
        }

        let toAdd: CreateMedPlanInterface = {
          patientPersonId: personId,
          medPlan: medPlan
        }

        createMedPlan(toAdd);
        setAddedPlan(true);
        console.log("addedPlan");
      }
    }

  }, [openUtils, addedPlan, setAddedPlan, treatmentPeriod, treatmentName, personId, createMedPlan]);

  useEffect(() => {
    if (addedPlan) {
      if (createdMedPlan !== undefined && addedList === false && createdMedPlan.createdMedPlanId !== undefined && createdMedPlan.createdMedPlanId !== "") {
        let medList: MedList = {
          startInterval: startInterval,
          endInterval: endInterval
        }

        let toAdd: CreateMedListInterface = {
          medPlanId: createdMedPlan.createdMedPlanId,
          medList: medList
        }

        createMedList(toAdd);
        setAddedList(true);
        console.log("addedList");
      }
    }
  }, [addedPlan, addedList, createdMedPlan, startInterval, endInterval, createMedList]);

  useEffect(() => {
    if (addedList) {
      if (createdMedList !== undefined && finished === false && createdMedList.createdMedListId !== undefined && createdMedList.createdMedListId !== "") {
        let toAdd: AddMedicineToMedListInterface = {
          medListId: createdMedList.createdMedListId,
          medicines: chosenMedicines
        }

        addMedicineToMedList(toAdd);
        setFinished(true);
        console.log("finished");
      }
    }
  }, [addedList, finished, createdMedList, chosenMedicines, addMedicineToMedList]);

  useEffect(() => { 
    if (finished) {
      if (addedMeds !== undefined && addedMeds.loadingAddMedicine !== undefined && addedMeds.successfulAdd === true) {
        setOpenUtils(false);
        setClose(true);
        console.log("close");
      }
    }
  }, [finished, addedMeds, setClose, setOpenUtils]);

  return (
    <></>
  );
}

const mapStateToProps = (state: any) => {
  return {
    createdMedPlan: state.medPlansReducer,
    createdMedList: state.medListReducer,
    addedMeds: state.medListReducer,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createMedPlan: (medPlan: CreateMedPlanInterface) => dispatch(createMedPlan(medPlan)),
    createMedList: (medList: CreateMedListInterface) => dispatch(createMedList(medList)),
    addMedicineToMedList: (medicines: AddMedicineToMedListInterface) => dispatch(addMedicineToMedList(medicines)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMedPlanUtils);
