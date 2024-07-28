import React from 'react';

export default function BackIcon({ handleClick }) {
  return (
    <div onClick={handleClick} className='cursor-pointer'>
      <img className='h-10' src='/assets/arrow.png' />
    </div>
  );
}
