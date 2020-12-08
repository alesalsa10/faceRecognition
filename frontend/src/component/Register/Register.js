import React, { useState } from 'react';
import styled from './Register.module.css';

export default function Register({ onRouteChange }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { name, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const responseData = await response.json(); //token
      console.log(responseData);
      if (!responseData.errors) {
        onRouteChange('signIn');
      } else {
        setError(responseData.errors[0].msg.toString());
        console.log(responseData.errors[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styled.loginBox}>
      <h2>Register</h2>
      <form>
        <p>Name</p>
        <input
          type='text'
          name='name'
          placeholder='Enter Name'
          value={name}
          onChange={onChangeHandler}
        />
        <p>Email</p>
        <input
          type='text'
          name='email'
          placeholder='Enter Email'
          vale={email}
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
          value='Register'
          onClick={onSubmitHandler}
        />
        <p onClick={() => onRouteChange('signIn')}>Sign In</p>
        {error && <div className={styled.error}>{error}</div>}
      </form>
    </div>
  );
}
