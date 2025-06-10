import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { createStars, createSaturnRings, planetData } from './utilis';

const canvas = document.getElementById('bg');
const tooltip = document.getElementById('tooltip');
const pauseBtn = document.getElementById('pauseBtn');
const toggleBtn = document.getElementById('toggleMode');
const speedPanel = document.getElementById('speedPanel');

let isPaused = false;
let isDark = false;
let speedMultipliers = {};
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 60);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const light = new THREE.PointLight(0xffffff, 2);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// Stars
scene.add(createStars());

// Planets
const planets = [];

planetData.forEach(data => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(data.size, 32, 32),
    new THREE.MeshStandardMaterial({ color: data.color })
  );
  mesh.userData = { ...data, angle: 0 };
  scene.add(mesh);
  planets.push(mesh);

  // Orbit Ring
  const orbit = new THREE.Mesh(
    new THREE.RingGeometry(data.distance - 0.05, data.distance + 0.05, 64),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);

  // Saturn Rings
  if (data.name === 'Saturn') {
    const ringMesh = createSaturnRings(data.size);
    mesh.add(ringMesh);
  }

  // Speed sliders
  const label = document.createElement('label');
  label.innerText = `${data.name}: `;
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0;
  slider.max = 5;
  slider.step = 0.01;
  slider.value = data.speed;
  slider.className = 'speed-control';
  slider.addEventListener('input', () => {
    speedMultipliers[data.name] = parseFloat(slider.value);
  });
  speedMultipliers[data.name] = data.speed;
  label.appendChild(slider);
  speedPanel.appendChild(label);
});

// Tooltip
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

window.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
});

window.addEventListener('click', () => {
  if (INTERSECTED) {
    gsap.to(camera.position, {
      x: INTERSECTED.position.x + 5,
      y: INTERSECTED.position.y + 5,
      z: INTERSECTED.position.z + 8,
      duration: 1.5,
      onUpdate: () => controls.update()
    });
  }
});

pauseBtn.onclick = () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
};

toggleBtn.onclick = () => {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
};

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  if (!isPaused) {
    planets.forEach(p => {
      p.userData.angle += speedMultipliers[p.userData.name];
      p.position.x = Math.cos(p.userData.angle) * p.userData.distance;
      p.position.z = Math.sin(p.userData.angle) * p.userData.distance;
    });
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    INTERSECTED = intersects[0].object;
    tooltip.innerText = INTERSECTED.userData.name;
    tooltip.style.display = 'block';
  } else {
    tooltip.style.display = 'none';
    INTERSECTED = null;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();
