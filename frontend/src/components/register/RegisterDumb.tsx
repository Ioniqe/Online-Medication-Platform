import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useLoginStyles } from '../../styles/loginStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface Props {
  gotoLoginPage: (event: React.MouseEvent<HTMLElement>) => void,
  sendNewUser: (event: React.MouseEvent<HTMLElement>) => void,

  message: string,

  username: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  gender: string,
  birthday: string,

  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  setFirstName: (firstName: string) => void,
  setLastName: (lastName: string) => void,
  setAddress: (address: string) => void,
  setBirthday: (birthday: string) => void,

  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

function RegisterDumb({ gotoLoginPage, sendNewUser, message,
  username, password, firstName, lastName, address, gender, birthday, setUsername,
  setPassword, setFirstName, setLastName, setAddress, setBirthday, handleChange }: Props) {
  const classes = useLoginStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleRoundedIcon style={{ fontSize: 40 }} />
      </Avatar>
      <Typography component="h1" variant="h5" className={classes.typography}>
        {message}
        </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={username}
              onChange={e => { setUsername(e.target.value) }}
              variant="outlined"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={password}
              onChange={e => { setPassword(e.target.value) }}
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName}
              onChange={e => { setFirstName(e.target.value) }}
              variant="outlined"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName}
              onChange={e => { setLastName(e.target.value) }}
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={address}
              onChange={e => { setAddress(e.target.value) }}
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              color="secondary"
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth color="secondary" className={classes.formControl}>
              <InputLabel id="gender" style={{ color: "#fff" }}>Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={gender}
                onChange={handleChange}
                label="Gender"
                color="secondary"
                style={{ color: "#fff" }}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              value={birthday}
              onChange={e => { setBirthday(e.target.value) }}
              fullWidth
              variant="outlined"
              id="date"
              label="Birthday"
              type="date"
              color="secondary"
              className={`${ classes.textField } ${classes.text}`}
              InputLabelProps={{
                shrink: true,
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="type"
              label="User Type"
              name="type"
              color="secondary"
              defaultValue="Doctor"
              disabled
              className={classes.text}
              InputLabelProps={{
                classes: {
                  root: classes.textField,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={`${classes.baseButton} ${classes.btn1}`}
          onClick={(e) => sendNewUser(e)}
        >
          Sign Up
        </Button>
        <Link
          color="secondary"
          component="button"
          variant="body2"
          href="#"
          className={classes.link}
          onClick={(e: React.MouseEvent<HTMLElement>) => gotoLoginPage(e)}
        >
          Already have an account? Sign in!
        </Link>
      </form>
    </div>
  );
}
export default RegisterDumb;