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
const extraRenderers = [new CSS2DRenderer()];
const NODE_R = 4;
function Graph({ sendNodeData }) {
  /*   // highlights
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };
 */
  // graph data
  const [data, setData] = useState(lesmisData);

  // highlighted and selected data
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
    // zoom from outside of node
    const distance = 10000;
    const centroid = {
      x: (edge.source.x + edge.target.x) / 2,
      y: (edge.source.y + edge.target.y) / 2,
      z: (edge.source.z + edge.target.z) / 2,
    };

    // Calculate direction vector from source to target
    const direction = {
      x: edge.target.x - edge.source.x,
      y: edge.target.y - edge.source.y,
      z: edge.target.z - edge.source.z,
    };

    // To find a perpendicular vector, you can take the cross product with an arbitrary vector
    const arbitraryVector = { x: 0, y: 1, z: 0 }; // You can change this to { x: 1, y: 0, z: 0 } if necessary
    const perpendicular = {
      x: direction.y * arbitraryVector.z - direction.z * arbitraryVector.y,
      y: direction.z * arbitraryVector.x - direction.x * arbitraryVector.z,
      z: direction.x * arbitraryVector.y - direction.y * arbitraryVector.x,
    };

    // Normalize perpendicular vector to unit length
    const length = Math.sqrt(
      perpendicular.x ** 2 + perpendicular.y ** 2 + perpendicular.z ** 2
    );
    const unitPerpendicular = {
      x: perpendicular.x / length,
      y: perpendicular.y / length,
      z: perpendicular.z / length,
    };
    const distRatio =
      1 + distance / Math.hypot(centroid.x, centroid.y, centroid.z);

    fgRef.current.cameraPosition(
      {
        x: centroid.x - unitPerpendicular.x * distRatio,
        y: centroid.y - unitPerpendicular.y * distRatio,
        z: centroid.z - unitPerpendicular.z * distRatio,
      }, // new position
      centroid, // lookAt ({ x, y, z })
      2000 // ms transition duration
    );
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

      // add random links
      const newLinks = [];
      for (let i = 0; i < Math.floor(Math.random() * 3 + 1); i++) {
        newLinks.push({
          source: id,
          target: nodes[Math.round(Math.random() * nodes.length - 1)].id,
          value: Math.floor(Math.random() * 40),
        });
      }

      return {
        nodes: [...nodes, { id, group }],
        links: [...links, ...newLinks],
      };
    });
  };

  /*   const handleNodeHover = (node) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = useCallback(
    (node, ctx) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
      ctx.fill();
    },
    [hoverNode]
  );
 */
  return (
    <div className='relative'>
      {infoVisible && <NodeInformation data={selectedData} />}

      <ForceGraph
        nodeRelSize={NODE_R}
        onBackgroundClick={() => setSelectedData(null)}
        extraRenderers={extraRenderers}
        onBackgroundRightClick={() => {
          setSelectedData(null);
          addNewData();
        }}
        ref={fgRef}
        nodeLabel='id'
        /*         autoPauseRedraw={false}
        linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
        linkDirectionalParticleWidth={(link) =>
          highlightLinks.has(link) ? 4 : 0
        }
        nodeCanvasObjectMode={(node) =>
          highlightNodes.has(node) ? 'before' : undefined
        }
        nodeCanvasObject={paintRing}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover} */
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
