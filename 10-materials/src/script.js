import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Light } from "three";
import * as lil from "lil-gui";

/**
 * Debug
 */
const gui = new lil.GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loadning manager
 */
const loadingManger = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManger);
const alphaTexture = textureLoader.load("textures/door/alpha.jpg");
const metalnessTexture = textureLoader.load("textures/door/metalness.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const normalTexture = textureLoader.load("textures/door/normal.jpg");
const doorColorTexture = textureLoader.load("textures/door/color.jpg");
const roughnessTexture = textureLoader.load("textures/door/roughness.jpg");
const doorHeightTexture = textureLoader.load("textures/door/height.jpg");

const gradientsTexture = textureLoader.load("textures/gradients/3.jpg");
const matcaps1Texture = textureLoader.load("textures/matcaps/3.png");

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;
// material.side = THREE.DoubleSide

// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshDepthMaterial();
// material.flatShading = true

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientsTexture;
// material.shininess = 100

const material = new THREE.MeshStandardMaterial();

// material.metalness = 0.45;
// material.roughness = 0.45;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05
material.metalnessMap = metalnessTexture;
material.roughnessMap = roughnessTexture;
material.normalMap = normalTexture
material.transparent = true;
material.alphaMap = alphaTexture

gui.add(material, "metalness").min(0).max(1);
gui.add(material, "roughness").min(0).max(1);
gui.add(material, "aoMapIntensity").min(0).max(10);
gui.add(material, "displacementScale").min(0).max(1);

const sphare = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphare.position.x = 1.5;
sphare.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphare.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100,100), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);
torus.position.x = -1.5;
scene.add(plane, sphare, torus);

/**
 *  Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objcets
  sphare.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphare.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
