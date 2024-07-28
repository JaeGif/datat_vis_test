import React from 'react';
import BackIcon from './icons/BackIcon';
import ForwardIcon from './icons/ForwardIcon';

function Header({ isOpen }) {
  return (
    <span>
      <h1 className='text-3xl'>Dashboard</h1>
      <div>{isOpen ? <BackIcon /> : <ForwardIcon />}</div>
    </span>
  );
}

export default Header;
