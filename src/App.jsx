import React, { useState, useReducer } from 'react';
import Graph from './Graph';
import Dashboard from './components/Dashboard';

function App() {
  const [nodeData, setNodeData] = useState(null);

  const getNodeData = (data) => {
    setNodeData(data);
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      {/*       <Dashboard data={nodeData} />
       */}
      <Graph sendNodeData={getNodeData} />
    </div>
  );
}

export default App;
