import React, { useState } from 'react';
import CaregiverTabs from './CaregiverTabs';
import CaregiverHeader from './CaregiverHeader';

function CaregiverHome() {
  const [drawerStyle, setDrawerStyle] = useState("makeStyles-drawerClose-7");

  return (
    <>
      <CaregiverHeader
        drawerStyle={drawerStyle}
        setDrawerStyle={setDrawerStyle}
      />
      <CaregiverTabs
        drawerStyle={drawerStyle}
      />
    </>
  );
}
export default CaregiverHome;