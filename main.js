import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// Camera setup - BUG 1: Camera positioned incorrectly (too close, can't see objects)
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 0.5; // BUG: Should be around 5-10 to see the scene properly

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting - BUG 2: Missing ambient light, scene is too dark
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
// Missing: scene.add(new THREE.AmbientLight(0x404040, 0.5));

// Create cubes
const cubes = [];
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];

for (let i = 0; i < 5; i++) {
    // BUG 3: Using wrong material property (color should be in material constructor)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial();
    material.color = colors[i]; // BUG: Should be { color: colors[i] } in constructor

    const cube = new THREE.Mesh(geometry, material);

    // Position cubes in a circle
    const angle = (i / 5) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * 3;
    cube.position.y = Math.sin(angle) * 3;

    scene.add(cube);
    cubes.push(cube);
}

// Animation loop - BUG 4: Missing requestAnimationFrame, animation won't work
function animate() {
    // BUG: Missing requestAnimationFrame(animate);

    // Rotate cubes
    cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
