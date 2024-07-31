import React from 'react';

function NodeInformation({ data }) {
  let dataKVArr = null;
  if (data) dataKVArr = Object.entries(data);

  return (
    <div className='w-1/6 p-4 text-white absolute top-[35%] bg-blue-400 left-[20%] bg-opacity-75 z-50 rounded-md shadow-md'>
      <h1 className='text-3xl'>Selected Data</h1>
      {dataKVArr?.map((el, i) => (
        <p key={i}>
          {el[0].toUpperCase()} : {el[1]}
        </p>
      ))}
      <p className='flex-wrap'>
        Further graphs or links are possible with the data connected to this
        node ...
      </p>
    </div>
  );
}

export default NodeInformation;
