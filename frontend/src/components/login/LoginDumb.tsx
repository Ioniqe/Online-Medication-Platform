import React from 'react';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { useLoginStyles } from '../../styles/loginStyles';
import Link from '@material-ui/core/Link';

interface Props {
  username: string,
  password: string,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  sendUser: (event: React.MouseEvent<HTMLElement>) => void
  gotoRegisterPage: (event: React.MouseEvent<HTMLElement>) => void
  message: string,
}

function LoginDumb({ username, password, setUsername, setPassword, sendUser, message, gotoRegisterPage }: Props) {
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          color="secondary"
          value={username}
          onChange={e => { setUsername(e.target.value) }}
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          color="secondary"
          value={password}
          className={classes.text}
          onChange={e => { setPassword(e.target.value) }}
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={`${classes.baseButton} ${classes.btn1}`}
          onClick={(e) => sendUser(e)}
        >
          Log In
        </Button>

        <Link
          color="secondary"
          component="button"
          variant="body2"
          href="#"
          className={classes.link}
          onClick={(e: React.MouseEvent<HTMLElement>) => gotoRegisterPage(e)}
        >
          Don't have an account? Sign up for free!
        </Link>
      </form>
    </div>
  );
}

export default LoginDumb;