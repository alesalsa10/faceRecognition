import React, { useState } from 'react';
import styled from './SignIn.module.css';
import Loader from 'react-loader-spinner';

export default function SignIn({
  onRouteChange,
  onChangeHandler,
  onSubmitHandler,
  error,
  email,
  password,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    onSubmitHandler(e);
  };

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
        {isLoading === false || error !== '' ? (
          <input type='submit' name='' value='Sign In' onClick={handleSubmit} />
        ) : (
          <Loader type='ThreeDots' color='#ff267e' />
        )}
        <p onClick={() => onRouteChange('register')}>Register</p>
      </form>
      {error && <div className={styled.error}>{error}</div>}
    </div>
  );
}
