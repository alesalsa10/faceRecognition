import React from 'react';
import styled from './Navigation.module.css';

export default function Navigation({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <nav className={styled.navigationLink}>
        <p
          onClick={() => onRouteChange('signOut')}
          className={styled.signInOut}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className={styled.navigationLink}>
        <p onClick={() => onRouteChange('signIn')} className={styled.signInOut}>
          Sign in
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className={styled.signInOut}
        >
          Register
        </p>
      </nav>
    );
  }
}
