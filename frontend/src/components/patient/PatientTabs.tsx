import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import { usePatientStyles, useStyles2 } from '../../styles/patientStyles';
import PatientAccDetails from './PatientAccDetails';
import MedPlansList from './MedPlansList';

interface Props {
  drawerStyle: string,
}

function PatientTabs({ drawerStyle }: Props) {
  const classes = usePatientStyles();
  const classes2 = useStyles2();
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
        <Tab label="Medication Plans" className={classes.tabStyle} />
      </Tabs>

      <div className={classes.tabPanels}>
        <TabPanel value={value} index={0} >
          <PatientAccDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MedPlansList backgroundStyle={classes2.titleBackgroundColorPatient}/>
        </TabPanel>
      </div>
    </div>
  );
}
export default PatientTabs;