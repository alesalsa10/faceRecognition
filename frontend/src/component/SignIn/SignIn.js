import React from 'react';
import styled from './SignIn.module.css';

export default function SignIn({ onRouteChange, onChangeHandler, onSubmitHandler, error,email, password }) {
  
  return (
    <div className={styled.loginBox}>
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <p>Email</p>
        <input
          type='text'
          name='email'
          placeholder='Enter Email'
          value={email}
          onChange={onChangeHandler}
        />
        <p>Password</p>
        <input
          type='password'
          name='password'
          placeholder='******'
          value={password}
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          name=''
          value='Sign In'
          onClick={onSubmitHandler}
        />
        <p onClick={() => onRouteChange('register')}>Register</p>
      </form>
      {error && <div className={styled.error}>{error}</div>}
    </div>
  );
}
