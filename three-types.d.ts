// Type declarations for Three.js with React Three Fiber
import { Object3D } from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3D
  }
}
