import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { verifyUser } from '../../actions/LoginAction';
import { PersonWithId, PersonWithIdAndToken, User } from '../../model/models';
import LoginDumb from './LoginDumb';

interface Props {
  verifyLogin: (user: User) => void,
  loggedUser: {
    loading: boolean,
    user: PersonWithIdAndToken,
    error: boolean
  },
}

function LoginSmart({ verifyLogin, loggedUser }: Props) {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Sign in');

  let gotoRegisterPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push('/register');
  }

  let sendUser = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    let user: User = { username, password };
    (username !== '' && password !== '') && verifyLogin(user);
  }

  useEffect(() => {
    if (loggedUser.user !== undefined) {
      if (loggedUser.error === true) {
        setMessage('Invalid User!');
      } else {
        if (loggedUser.user.type !== '') {
          setMessage('Sign in');


          let localStorageUser: PersonWithId = {
            "id": loggedUser.user.id,
            "username": loggedUser.user.username,
            "password": loggedUser.user.password,
            "firstname": loggedUser.user.firstname,
            "lastname": loggedUser.user.lastname,
            "address": loggedUser.user.address,
            "birth_date": loggedUser.user.birth_date,
            "gender": loggedUser.user.gender,
            "type": loggedUser.user.type
          }

          // localStorage.setItem('user', JSON.stringify(loggedUser.user));
          localStorage.setItem('user', JSON.stringify(localStorageUser));
          localStorage.setItem('token', JSON.stringify(loggedUser.user.token));
          window.location.reload();
        }
      }
    }
  }, [verifyLogin, loggedUser])

  if (loggedUser.user.type !== '') {
    switch (loggedUser.user.type) {
      case 'patient':
        return <Redirect push to="/patient" />
      case 'doctor':
        return <Redirect push to="/doctor" />
      case 'caregiver':
        return <Redirect push to="/caregiver" />
      default:
        console.error('user type not recognized');
    }
  }

  return (
    <LoginDumb
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      sendUser={sendUser}
      gotoRegisterPage={gotoRegisterPage}
      message={message}
    />
  );
}

const mapStateToProps = (state: any) => {
  return {
    loggedUser: state.login //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    verifyLogin: (user: User) => dispatch(verifyUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSmart);