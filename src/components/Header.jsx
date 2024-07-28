import React from 'react';
import BackIcon from './icons/BackIcon';
import ForwardIcon from './icons/ForwardIcon';

function Header({ isOpen, handleToggleModal }) {
  return (
    <span className='flex justify-center items-center p-5'>
      <h1 className='text-3xl'>Dashboard</h1>
      {/*       <div>
        {isOpen ? (
          <BackIcon handleClick={handleToggleModal} />
        ) : (
          <ForwardIcon handleClick={handleToggleModal} />
        )}
      </div> */}
    </span>
  );
}

export default Header;
