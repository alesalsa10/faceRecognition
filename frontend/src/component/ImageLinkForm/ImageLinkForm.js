import React from 'react';
import styled from './ImageLinkForm.module.css';

export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className={styled.headerP}>
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className={styled.inputAndButtonDiv}>
        <input
          className={styled.inputField}
          type='text'
          onChange={onInputChange}
          placeholder='Enter link to jpg image'
        />
        <button className={styled.detectButton} onClick={onButtonSubmit} >Detect</button>
      </div>
    </div>
  );
}
