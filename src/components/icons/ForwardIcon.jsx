import React from 'react';

function ForwardIcon({ handleClick }) {
  return (
    <div onClick={handleClick} className='cursor-pointer'>
      <img className='h-10 rotate-180' src='/assets/arrow.png' />
    </div>
  );
}

export default ForwardIcon;
