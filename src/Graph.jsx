import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './experience/Experience';
import ForceGraph from 'react-force-graph-3d';
import testData from './data/test.json';

function Graph() {
  const handleNodeHover = () => {
    // popup showing data from the individual node
  };
  const handleNodeClick = () => {
    // leftSide modal changes depending on the data in the node
  };

  return (
    <ForceGraph nodeAutoColorBy={'group'} graphData={testData} />
    /*     <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [2, 2, 5],
      }}
    >
      <color args={['rgb(34, 34, 34)']} attach='background' />
      <Experience />
    </Canvas> */
  );
}

export default Graph;
