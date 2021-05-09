import React from 'react';
import { Redirect, Route } from 'react-router';

interface Props {
  link: string
  component: JSX.Element,
  page: string
}

function ProtectedRoute({ link, component, page }: Props) {
  return (
    <Route exact path={link}
      render={() => (
        (localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user') as string).type === page) ? (component) : (<Redirect to='/' />)
      )}
    />
  );
}
export default ProtectedRoute