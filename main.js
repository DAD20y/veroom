import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://cdn.skypack.dev/three/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0,1.6,3);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

scene.add(new THREE.HemisphereLight(0xffffff,0x444444,1));

const controls = new OrbitControls(camera, renderer.domElement);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50,50),
  new THREE.MeshStandardMaterial({color:0x555555})
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

const loader = new GLTFLoader();
const products = [];
fetch('products.json').then(r=>r.json()).then(data=>{
  data.forEach(p=>{
    loader.load(p.model,g=>{
      const m = g.scene;
      m.position.set(...p.pos);
      m.userData = p;
      scene.add(m);
      products.push(m);
    });
  });
});

// Gaze cursor
const raycaster = new THREE.Raycaster();
const cursor = new THREE.Mesh(
  new THREE.RingGeometry(0.01,0.02,32),
  new THREE.MeshBasicMaterial({color:0xffffff})
);
cursor.position.z = -1;
camera.add(cursor);
scene.add(camera);

let gazeTarget=null, gazeStart=0;
const cart=[];

function handleGaze(){
  raycaster.setFromCamera({x:0,y:0},camera);
  const hits = raycaster.intersectObjects(products,true);
  if(hits.length){
    const obj = hits[0].object.parent;
    if(gazeTarget!==obj){
      gazeTarget=obj;
      gazeStart=performance.now();
    }else if(performance.now()-gazeStart>2000){
      cart.push(obj.userData);
      console.log("Added to cart:", obj.userData.name);
      gazeTarget=null;
    }
  }else{
    gazeTarget=null;
  }
}

renderer.setAnimationLoop(()=>{
  if(renderer.xr.isPresenting) handleGaze();
  renderer.render(scene,camera);
});
