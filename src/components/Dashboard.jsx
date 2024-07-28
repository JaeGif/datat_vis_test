import React, { useState } from 'react';
import NodeInformation from './nodes/NodeInformation';
import Header from './Header';

function Dashboard({ data }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className='w-3/12 h-full flex flex-col p-4 gap-5 bg-gray-400'>
      <Header isOpen={isOpen} handleToggleModal={handleToggleModal} />
      <div>
        <h1>Selected Data</h1>
        <NodeInformation data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
