import React from 'react';
import Graph from './Graph';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Dashboard />
      <div className='w-9/12'>
        <Graph />
      </div>
    </div>
  );
}

export default App;
