import React, { useState } from 'react';
import DoctorHeader from './DoctorHeader';
import DoctorTabs from './DoctorTabs';

function DoctorHome() {
  const [drawerStyle, setDrawerStyle] = useState("makeStyles-drawerClose-7");
  
  return (
    <>
      <DoctorHeader
        drawerStyle={drawerStyle}
        setDrawerStyle={setDrawerStyle}
      />
      <DoctorTabs
        drawerStyle={drawerStyle}
      />
    </>
  );
}
export default DoctorHome;