import React, { useState } from 'react';
import NodeInformation from './NodeInformation';
import Header from './Header';
import NodeDescription from './NodeDescription';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='w-3/12 h-full flex flex-col p-4'>
      <Header isOpen={isOpen} />
      <NodeInformation />
      <NodeDescription />
    </div>
  );
}

export default Dashboard;
