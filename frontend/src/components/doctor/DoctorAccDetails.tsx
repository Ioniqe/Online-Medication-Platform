import { TableContainer, Paper, Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import { useStyles2 } from "../../styles/doctorStyles";

function DoctorAccDetails() {
  const classes = useStyles2();

  let caregiver = localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string);

  return (
    <>
      <h1 style={{textAlign:'center', fontSize: '3em'}}>Account Details</h1>
      <div className={classes.accDetailsStyle}>
        <TableContainer component={Paper} className={classes.paperStyleCaregiverAccDetails}>
          <Table aria-label="simple table">
            <TableBody >
              <TableRow>
                <TableCell className={classes.text}>Username</TableCell>
                <TableCell className={classes.text} scope="row" align="right">{caregiver.username}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.text}>Password</TableCell>
                <TableCell className={classes.text} scope="row" align="right">{caregiver.password}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.text}>Firstname</TableCell>
                <TableCell className={classes.text} scope="row" align="right">{caregiver.firstname}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.text}>Lastname</TableCell>
                <TableCell className={classes.text} scope="row" align="right">{caregiver.lastname}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.text}>Gender</TableCell>
                <TableCell className={classes.text} scope="row" align="right">{caregiver.gender}</TableCell>
              </TableRow>
            </TableBody>

          </Table>
        </TableContainer >
      </div>
    </>
  );
};

export default DoctorAccDetails;
