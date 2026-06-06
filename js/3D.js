import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 25);

// Renderer

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document
  .getElementById("container3D")
  .appendChild(renderer.domElement);

// Lighting

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// 3D Model

let object;

const loader = new GLTFLoader();

loader.load(
  "assets/satelite.glb",

  (gltf) => {
    object = gltf.scene;
    scene.add(object);

    // Schaal
    object.scale.set(6, 6, 6);

    // Model centreren
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());

    object.position.sub(center);

    // Beginoriëntatie
    object.rotation.x = 0.2;
    object.rotation.y = -0.3;
    object.rotation.z = 0.1;

    camera.lookAt(0, 0, 0);
  },

  undefined,

  (error) => {
    console.error("Fout bij laden:", error);
  }
);

// Animation

function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.0005;

  if (object) {
    // Basisoriëntatie: voorkant mooi naar camera
    object.rotation.x = 0.15 + Math.sin(t * 1.2) * 0.04;
    object.rotation.y = -0.25 + Math.sin(t * 0.8) * 0.06;
    object.rotation.z = 0.08 + Math.sin(t * 1.5) * 0.03;

    // Subtiel zweven
    object.position.y = -6 + Math.sin(t * 2) * 0.3;
    object.position.x = 1 + Math.cos(t) * 0.1;
  }

  renderer.render(scene, camera);
}

animate();

// Resize

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});

// Bronnen
// https://chatgpt.com/c/6a249690-5108-83eb-b4d5-b941f6e0142e
// https://threejs.org/docs/#Object3D.rotation
