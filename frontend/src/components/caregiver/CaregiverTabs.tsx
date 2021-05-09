import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CaregiverAccDetails from './CaregiverAccDetails';
import CaregiverPatientList from './CaregiverPatientList';
import { useCaregiverStyles } from '../../styles/caregiverStyles';
import TabPanel from '../TabPanel';

interface Props {
  drawerStyle: string,
}

function CaregiverTabs({ drawerStyle }: Props) {
  const classes = useCaregiverStyles();
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
        <Tab label="Account Details" style={{ marginTop: '20px', paddingLeft: 0 }} className={classes.tabStyle}/>
        <Tab label="Patients" className={classes.tabStyle}/>
      </Tabs>

      <div className={classes.tabPanels}>
        <TabPanel value={value} index={0} >
          <CaregiverAccDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CaregiverPatientList />
        </TabPanel>
      </div>
    </div>
  );
}
export default CaregiverTabs;