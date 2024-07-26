import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

export default function Experience() {
  return (
    <>
      <Perf position={'top-left'} />
      <OrbitControls makeDefault />
      <ambientLight intensity={2} />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={'yellow'} />
      </mesh>
    </>
  );
}
