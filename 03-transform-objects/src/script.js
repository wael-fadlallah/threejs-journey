import './style.css'
import * as THREE from 'three';

// A scene that will contain objects
const scene = new THREE.Scene();


// Group
const group = new THREE.Group();
scene.add(group);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
);
group.add(cube)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
);
cube2.position.x = -1 
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.x = 1 
group.add(cube3)

group.rotation.y = 0.3
// Axes Helper
const axeshelper = new THREE.AxesHelper(1);

scene.add(axeshelper);
// A camera 📷
/**
 * PerspectiveCamera accept the fellowing:
 * - Field of view (fov): 75
 * - Aspect Ratio
 */
const sizes = {
  width: 600,
  height: 400,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

// A renderer 
const canvas = document.querySelector("canvas");
const renderss = new THREE.WebGLRenderer({
  canvas,
});


renderss.setSize(sizes.width, sizes.height);
renderss.render(scene, camera);
