import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDoctorStyles } from '../../styles/doctorStyles';
import TabPanel from '../TabPanel';
import DoctorAccDetails from './DoctorAccDetails';
import DoctorPatientList from './DoctorPatientList';
import DoctorCaregiverList from './DoctorCaregiverList';
import DoctorMedicineList from './DoctorMedicineList';

interface Props {
  drawerStyle: string,
}

function DoctorTabs({ drawerStyle }: Props) {
  const classes = useDoctorStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={drawerStyle}
      >
        <Tab label="Account Details" style={{ marginTop: '20px', paddingLeft: 0 }} className={classes.tabStyle} />
        <Tab label="Patients" className={classes.tabStyle} />
        <Tab label="Caregivers" className={classes.tabStyle} />
        <Tab label="Medication" className={classes.tabStyle} />
      </Tabs>

      <div className={classes.tabPanels}>
        <TabPanel value={value} index={0} >
          <DoctorAccDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DoctorPatientList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DoctorCaregiverList />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DoctorMedicineList />
        </TabPanel>
      </div>
    </div>
  );
}
export default DoctorTabs;