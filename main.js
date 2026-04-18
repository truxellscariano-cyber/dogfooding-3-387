import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 8);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加光照 - 修复：增强光照强度使立方体清晰可见
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// 创建立方体
const cubes = [];
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];

for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: colors[i] });

    const cube = new THREE.Mesh(geometry, material);

    // 修复：在 XZ 平面上圆形排列（水平面）
    const angle = (i / 5) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * 3;
    cube.position.z = Math.sin(angle) * 3;

    scene.add(cube);
    cubes.push(cube);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);

    // 每个立方体持续旋转
    cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// 响应窗口大小变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
