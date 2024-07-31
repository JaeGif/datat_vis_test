import React, { useCallback, useEffect, useRef, useState } from 'react';
import ForceGraph from 'react-force-graph-3d';
import lesmisData from './data/test.json';
import * as THREE from 'three';
import uniqid from 'uniqid';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { faker } from '@faker-js/faker';
import NodeInformation from './components/nodes/NodeInformation';

function Graph({ sendNodeData }) {
  const extraRenderers = [new CSS2DRenderer()];
  // Points

  const [data, setData] = useState(lesmisData);
  const [selectedData, setSelectedData] = useState();
  const [infoVisible, setInfoVisible] = useState();

  const fgRef = useRef();
  const updateInfoElement = (data) => {
    //
    setSelectedData(data);
  };
  useEffect(() => {
    if (selectedData) setInfoVisible(true);
    else setInfoVisible(false);
  }, [selectedData]);

  const handleNodeHover = () => {
    // popup showing data from the individual node
  };

  const handleNodeClick = useCallback(
    (node) => {
      console.log(node);

      // NODE INCLUDES THREE.OBJECT DATA :)
      // zoom from outside of node
      const distance = 50;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      console.log(fgRef);
      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        { x: node.x, y: node.y, z: node.z }, // lookAt ({ x, y, z })
        2000 // ms transition duration
      );
      const nodeData = {
        type: 'node',
        id: node.id,
        color: node.color,
        group: node.group,
      };
      updateInfoElement(nodeData);
      // sendNodeData(nodeData);

      // cause node data to pop-up in a modal
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
    updateInfoElement(edgeData);
    // sendNodeData(edgeData);
  });

  const addNewData = () => {
    setData(({ nodes, links }) => {
      const id = faker.person.fullName() + nodes.length;
      const group = Math.floor(Math.random() * 10);
      // make a unique new id

      return {
        nodes: [...nodes, { id, group }],
        links: [
          ...links,
          {
            source: id,
            target: nodes[Math.round(Math.random() * nodes.length - 1)].id,
            value: Math.floor(Math.random() * 40),
          },
        ],
      };
    });
  };
  const geometries = [];
  const material = [];
  return (
    <div className='relative'>
      {infoVisible && <NodeInformation data={selectedData} />}

      <ForceGraph
        onBackgroundClick={() => setSelectedData(null)}
        extraRenderers={extraRenderers}
        onBackgroundRightClick={() => {
          setSelectedData(null);
          addNewData();
        }}
        ref={fgRef}
        nodeLabel='id'
        /*         nodeThreeObject={({ group }) =>
          new THREE.Mesh(
            [
              new THREE.BoxGeometry(
                Math.random() * 20,
                Math.random() * 20,
                Math.random() * 20
              ),
              new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
              new THREE.CylinderGeometry(
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 20
              ),
              new THREE.DodecahedronGeometry(Math.random() * 10),
              new THREE.SphereGeometry(Math.random() * 10),
              new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
              new THREE.TorusKnotGeometry(
                Math.random() * 10,
                Math.random() * 2
              ),
            ][group % 3],
            new THREE.MeshLambertMaterial({
              color: Math.round(Math.random() * Math.pow(2, 24)),
              transparent: true,
              opacity: 0.75,
            })
          )
        } */
        nodeResolution={24}
        nodeOpacity={1}
        onNodeClick={handleNodeClick}
        onLinkClick={handleEdgeClick}
        linkDirectionalParticles={'value'}
        linkDirectionalParticleColor={'#ff33dd'}
        linkLabel={(d) => d.source.id + ' -> ' + d.target.id}
        linkDirectionalParticleResolution={16}
        linkDirectionalParticleSpeed={(d) => d.value * 0.0007}
        nodeAutoColorBy={'group'}
        graphData={data}
      />
    </div>
  );
}

export default Graph;
