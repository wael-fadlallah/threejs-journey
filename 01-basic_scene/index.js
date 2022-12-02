// We need 4 elements to get started:

// 1. A scene that will contain objects
const scene = new THREE.Scene();


// 2. Some objects, we are creating a red cube bellow and adding it to the scene
const gemoetry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(gemoetry, material);
scene.add(mesh);

// 3. A camera 📷
/**
 * PerspectiveCamera accept the fellowing:
 * - Field of view (fov): 75
 * - Aspect Ratio
 */
const sizes = {
  width: 400,
  height: 200,
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

// 4. A renderer 
const canvas = document.querySelector("canvas");
const renderss = new THREE.WebGLRenderer({
  canvas,
});


renderss.setSize(sizes.width, sizes.height);
renderss.render(scene, camera);
