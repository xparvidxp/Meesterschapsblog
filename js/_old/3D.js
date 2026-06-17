import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 25);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document
  .getElementById("container3D")
  .appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 3);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

let object;

const loader = new GLTFLoader();

// Responsiveness

function getResponsiveScale() {
  const width = window.innerWidth;

  if (width < 600) return 3.5;
  if (width < 1000) return 5;

  return 6;
}

function getStartX() {
  const width = window.innerWidth;

  if (width < 600) return 0.7;
  if (width < 1000) return 0.8;

  return 1;
}

function getStartY() {
  const width = window.innerWidth;

  if (width < 600) return 0;
  if (width < 1000) return -4;

  return -6;
}

function getEndX() {
  const width = window.innerWidth;

  if (width < 600) return 2.5;
  if (width < 1000) return 4;

  return 15;
}

function getEndY() {
  const width = window.innerWidth;

  if (width < 600) return -2;
  if (width < 1000) return -3;

  return 1;
}

function updateModelScale() {
  if (!object) return;

  const scale = getResponsiveScale();
  object.scale.set(scale, scale, scale);
}

function getScrollProgress() {
  const stopPoint = window.innerHeight * 1;

  return Math.min(window.scrollY / stopPoint, 1);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

loader.load(
  "assets/satelite.glb",

  (gltf) => {
    object = gltf.scene;
    scene.add(object);

    updateModelScale();

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());

    object.position.sub(center);

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

function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.0005;

  if (object) {
    const progress = getScrollProgress();

    const startX = getStartX();
    const startY = getStartY();

    const endX = getEndX();
    const endY = getEndY();

    const startScale = getResponsiveScale();
    const endScale = startScale * 0.7;
    const scale = lerp(startScale, endScale, progress);

    object.scale.set(scale, scale, scale);

    if (progress >= 1) {
      const extraScroll = window.scrollY - window.innerHeight;

      object.position.x = endX;
      object.position.y = endY + extraScroll * 0.02;
    } else {
      const arc = Math.sin(progress * Math.PI) * 3.5;

      object.position.x =
        lerp(startX, endX, progress) + Math.cos(t) * 0.1;

      object.position.y =
        lerp(startY, endY, progress) + arc + Math.sin(t * 2) * 0.3;
    }

    const scrollRotation = progress * 0.15;

object.rotation.x =
  0.15 -
  scrollRotation * 0.05 +
  Math.sin(t * 1.2) * 0.04;

object.rotation.y =
  -0.25 -
  scrollRotation +
  Math.sin(t * 0.8) * 0.06;

object.rotation.z =
  0.08 -
  scrollRotation * 0.03 +
  Math.sin(t * 1.5) * 0.03;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  updateModelScale();
});

// Bronnen
// http://threejs.org/docs/