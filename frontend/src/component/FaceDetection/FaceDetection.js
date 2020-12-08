import React from 'react';
import styled from './FaceDetection.module.css';

export default function FaceDetection({ url, boxes }) {
  return (
    <div className={styled.imgDiv}>
      <div className={styled.imgSubDiv}>
        <img id='inputImage' className={styled.img} alt='' src={url} />

        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className={styled.boundingBox}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
