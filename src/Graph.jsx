import React, { useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './experience/Experience';
import ForceGraph from 'react-force-graph-3d';
import testData from './data/test.json';
import { Perf } from 'r3f-perf';

function Graph({ sendNodeData, sendLinkData }) {
  const fgRef = useRef();
  const handleNodeHover = () => {
    // popup showing data from the individual node
  };
  const handleNodeClick = useCallback(
    (node) => {
      console.log(node);
      // NODE INCLUDES THREE.OBJECT DATA :)
      // zoom from outside of node
      const distance = 20;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000 // ms transition duration
      );
      const nodeData = {
        type: 'node',
        id: node.id,
        color: node.color,
        group: node.group,
      };
      sendNodeData(nodeData);
    },
    [fgRef]
  );
  const handleEdgeClick = useCallback((edge) => {
    console.log(edge);
    const edgeData = {
      type: 'edge',
      source: edge.source.id,
      target: edge.target.id,
      value: edge.value,
    };
    sendNodeData(edgeData);
  });

  return (
    <div className='w-9/12'>
      <ForceGraph
        ref={fgRef}
        nodeLabel='id'
        nodeResolution={16}
        nodeOpacity={1}
        onNodeClick={handleNodeClick}
        onLinkClick={handleEdgeClick}
        linkDirectionalParticles={'value'}
        linkDirectionalParticleColor={'#ff33dd'}
        linkLabel={(d) => d.source.id + ' -> ' + d.target.id}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticleResolution={16}
        linkDirectionalParticleSpeed={(d) => d.value * 0.0001}
        nodeAutoColorBy={'group'}
        graphData={testData}
      />
    </div>
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
