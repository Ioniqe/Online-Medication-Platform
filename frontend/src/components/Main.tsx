import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CaregiverHome from './caregiver/CaregiverHome';
import DoctorHome from './doctor/DoctorHome';
import LoginSmart from "./login/LoginSmart";
import PatientHome from './patient/PatientHome';
import RegisterSmart from './register/RegisterSmart';

function Main() {
  return (
    <Switch>
      <Route exact path='/' component={LoginSmart} />
      <Route exact path='/register' component={RegisterSmart} />

      <Route exact path='/patient' render={() => (
        (localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string).type === "patient") ? (<PatientHome />) : (<Redirect to='/' />)
      )} />

      <Route exact path='/doctor' render={() => (
        (localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string).type === "doctor") ? (<DoctorHome />) : (<Redirect to='/' />)
      )} />

      <Route exact path='/caregiver' render={() => (
        (localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string).type === "caregiver") ? (<CaregiverHome />) : (<Redirect to='/' />)
      )} />
    </Switch>
  );
}
export default Main;