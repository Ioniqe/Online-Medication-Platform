import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Person } from '../../model/models';
import RegisterDumb from './RegisterDumb';
import { connect } from 'react-redux';
import { resetRegister, saveUser } from '../../actions/RegisterAction';
import Popup from '../Popup';

const verifyAllFieldsArNotNull = (person: Person): boolean => {
  let ok = true;
  Object.entries(person).forEach((key, value) => key[1].length === 0 && (ok = false));
  return ok;
}

interface Props {
  saveRegisteredUser: (person: Person) => void,
  resetRegisteredUser: () => void,
  registeredUser: {
    loading: boolean,
    registerSuccessful: boolean,
    error: boolean
  },
}

function RegisterSmart({ registeredUser, resetRegisteredUser, saveRegisteredUser }: Props) {
  const history = useHistory();

  const [message, setMessage] = useState("Sing up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("1990-10-10");
  const [gender, setGender] = React.useState('male');
  const [open, setOpen] = React.useState(false);

  const handleClosePopup = () => {
    setOpen(false);
    history.push("/");
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  let gotoLoginPage = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push("/");
  }

  let sendNewUser = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    let newDate = new Date(birthday);
    let person: Person = { username, password, firstname: firstName, lastname: lastName, address, birth_date: newDate, gender, type: "doctor" };
    verifyAllFieldsArNotNull(person) && saveRegisteredUser(person);
  }

  useEffect(() => {
    if (registeredUser !== undefined) {
      if (registeredUser.error === true) {
        setMessage("Error!");
      } else if (registeredUser.registerSuccessful === true) {
        setMessage("Success!");
        resetRegisteredUser();
        setOpen(true);
      }
    }
  }, [saveRegisteredUser, registeredUser, resetRegisteredUser])

  return (
    <>
      <RegisterDumb
        message={message}
        gotoLoginPage={gotoLoginPage}
        sendNewUser={sendNewUser}

        username={username}
        password={password}
        firstName={firstName}
        lastName={lastName}
        address={address}
        gender={gender}
        birthday={birthday}

        setUsername={setUsername}
        setPassword={setPassword}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setAddress={setAddress}
        setBirthday={setBirthday}
        handleChange={handleChange}
      />
      <Popup
        open={open}
        handleClosePopup={handleClosePopup}
      />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    registeredUser: state.register //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    saveRegisteredUser: (person: Person) => dispatch(saveUser(person)),
    resetRegisteredUser: () => dispatch(resetRegister()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSmart);
