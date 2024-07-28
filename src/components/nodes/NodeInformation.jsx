import React from 'react';

function NodeInformation({ data }) {
  let dataKVArr = null;
  if (data) dataKVArr = Object.entries(data);

  return (
    <div>
      {dataKVArr?.map((el, i) => (
        <p key={i}>
          {el[0]} : {el[1]}
        </p>
      ))}
    </div>
  );
}

export default NodeInformation;
