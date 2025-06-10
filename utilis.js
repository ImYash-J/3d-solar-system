import * as THREE from 'three';

export const planetData = [
  { name: 'Mercury', color: 0xaaaaaa, size: 0.5, distance: 8, speed: 0.04 },
  { name: 'Venus', color: 0xffc04d, size: 0.9, distance: 11, speed: 0.03 },
  { name: 'Earth', color: 0x3399ff, size: 1, distance: 14, speed: 0.02 },
  { name: 'Mars', color: 0xff3300, size: 0.8, distance: 17, speed: 0.015 },
  { name: 'Jupiter', color: 0xff9966, size: 2, distance: 22, speed: 0.008 },
  { name: 'Saturn', color: 0xcc9966, size: 1.7, distance: 28, speed: 0.006 },
  { name: 'Uranus', color: 0x66ffff, size: 1.2, distance: 34, speed: 0.004 },
  { name: 'Neptune', color: 0x3366ff, size: 1.2, distance: 40, speed: 0.003 }
];

export function createStars(count = 3000) {
  const starsGeometry = new THREE.BufferGeometry();
  const starVertices = [];

  for (let i = 0; i < count; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);
    starVertices.push(x, y, z);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  return new THREE.Points(starsGeometry, starMaterial);
}

export function createSaturnRings(radius) {
  const ringGeometry = new THREE.RingGeometry(radius + 0.2, radius + 0.7, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x999966,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  return ring;
}
