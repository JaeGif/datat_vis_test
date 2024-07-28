import React, { useState } from 'react';
import NodeInformation from './nodes/NodeInformation';
import Header from './Header';

function Dashboard({ data, changeDataSet }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className='w-3/12 h-full flex flex-col p-4 gap-5 text-white bg-gray-950'>
      <Header isOpen={isOpen} handleToggleModal={handleToggleModal} />
      <div>
        <h1>Selected Data</h1>
        <NodeInformation data={data} />
      </div>
      <div className='flex justify-center items-center gap-2'></div>
    </div>
  );
}

export default Dashboard;
