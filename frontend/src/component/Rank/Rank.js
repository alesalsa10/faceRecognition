import React from 'react';
import styled from './Rank.module.css';

export default function Rank({userData}) {
    return (
        <div>
            <div className={styled.header} >
                {userData.name + ', your current entry count is..'}
            </div>
            <div className={styled.number}>
                {userData.entries}
            </div>
        </div>
    )
}
