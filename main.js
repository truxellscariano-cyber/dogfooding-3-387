import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const cubes = [];
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];

for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: colors[i] });

    const cube = new THREE.Mesh(geometry, material);

    const angle = (i / 5) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * 3;
    cube.position.y = Math.sin(angle) * 3;

    scene.add(cube);
    cubes.push(cube);
}

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
