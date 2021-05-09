import React, { useState } from 'react';
import PatientHeader from './PatientHeader';
import PatientTabs from './PatientTabs';

function PatientHome() {
  const [drawerStyle, setDrawerStyle] = useState("makeStyles-drawerClose-7");
  
  return (
    <>
      <PatientHeader
        drawerStyle={drawerStyle}
        setDrawerStyle={setDrawerStyle}
      />
      <PatientTabs
        drawerStyle={drawerStyle}
      />
    </>
  );
}
export default PatientHome;