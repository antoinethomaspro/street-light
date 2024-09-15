import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector('canvas.webgl'));



// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import GUI from 'lil-gui'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// import { BlendFunction, EffectComposer, EffectPass, RenderPass, SelectiveBloomEffect, ToneMappingEffect, ToneMappingMode } from 'postprocessing';


// /**
//  * Base
//  */
// // Debug
// const gui = new GUI()

// if (import.meta.env.MODE === "production") {
//     gui.destroy();
// }

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();



// /**
//  * Update all materials
//  */
// const updateAllMaterials = () => {
//     scene.traverse((child) => {
//         if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
//             child.material.envMapIntensity = 1
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Models
//  */

// const gltfLoader = new GLTFLoader()

// function loadModel() {
//     return new Promise((resolve, reject) => {
//         const gltfLoader = new GLTFLoader();
//         gltfLoader.load(
//             '/models/StreetLight/StreetLight.glb',
//             (gltf) => {
//                 resolve(gltf);
//             },
//             undefined,
//             (error) => {
//                 reject(error);
//             }
//         );
//     });
// }

// let spotLight;
// let spotLightHelper;


// // Create the spotlight
// spotLight = new THREE.SpotLight(0xffffff, 0, 10, Math.PI * 0.3, 0.1, 1); // Initially off
// spotLight.castShadow = true;
// spotLight.position.set(2, 2.4, 1.3);
// spotLight.target.position.x = 2.0;
// spotLight.target.position.z = 2.0;
// scene.add(spotLight.target);
// scene.add(spotLight);

// // Create spotlight helper
// spotLightHelper = new THREE.SpotLightHelper(spotLight);
// // scene.add(spotLightHelper);

// // Load the model
// loadModel().then((gltf) => {
//     console.log("StreetLight model loaded", gltf);

//     const rootnode = gltf.scene.children[0];
//     rootnode.scale.set(0.45, 0.45, 0.45);
//     rootnode.position.set(2, 0, 0.7);
//     rootnode.castShadow = true;

//     // Recursively set castShadow for all children
//     rootnode.traverse((child) => {
//         if (child.isMesh) {
//             child.castShadow = true;
//         }
//     });

//     // Add the loaded model to the scene
//     scene.add(rootnode);

//     // Find StreetLight_2 mesh
//     const streetLight2 = rootnode.getObjectByName('StreetLight_2');

//     const originalMaterial = streetLight2.material;
//     const newMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//     streetLight2.material = newMaterial;
//     selectiveBloomEffect.selection.add(streetLight2);
//     spotLight.intensity = 4.5;

//     if (streetLight2) {
//         // Function to handle the click event
//         function onDocumentMouseClick(event) {
//             event.preventDefault();

//             // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//             // Update the raycaster with the camera and mouse position
//             raycaster.setFromCamera(mouse, camera);

//             // Calculate objects intersecting the raycaster
//             const intersects = raycaster.intersectObjects([plane]);

//             if (intersects.length > 0 && intersects[0].object === plane) {
//                 // Check if the light or bloom is off
//                 const isLightOff = spotLight.intensity === 0;
//                 const isBloomOff = !selectiveBloomEffect.selection.has(streetLight2);

//                 // If either is off, turn both on
//                 if (isLightOff || isBloomOff) {
//                     streetLight2.material = newMaterial;
//                     selectiveBloomEffect.selection.add(streetLight2);
//                     spotLight.intensity = 4.5;
//                     plane.material = planeMaterialOff;
//                 } else {
//                     // Otherwise, turn both off
//                     streetLight2.material = originalMaterial;
//                     selectiveBloomEffect.selection.delete(streetLight2);
//                     spotLight.intensity = 0;
//                     plane.material = planeMaterialOn;
//                 }

//                 spotLightHelper.update(); // Update the helper to reflect changes
//             }
//         }

//         // Add the event listener
//         window.addEventListener('click', onDocumentMouseClick, false);
//     }

// }).catch((error) => {
//     console.error('An error happened', error);
// });


// /**
//  * Bench
//  */


// gltfLoader.load(
//     '/models/Bench/Bench.glb',
//     (gltf) => {
//         // console.log(gltf)
//         const rootnode = gltf.scene.children[0]
//         rootnode.scale.set(2, 2, 2)
//         rootnode.rotateY(Math.PI * 0.5)
//         rootnode.position.set(0.5, 0.5, 0.7)
//         rootnode.castShadow = true

//         // Recursively set castShadow for all children
//         rootnode.traverse((child) => {
//             if (child.isMesh) {
//                 child.castShadow = true;
//             }
//         });

//         scene.add(rootnode)


//     },
//     () => {
//         console.log("progress")
//     },
//     () => {
//         console.log('An error happened')
//     }
// )

// /**
//  * Floor gltf
//  */

// gltfLoader.load(
//     '/models/Floor/Floor.glb',
//     (gltf) => {
//         // console.log(gltf)
//         const rootnode = gltf.scene.children[0]
//         const floor = rootnode.children[0]

//         // Retrieve the transformation matrix from the floor object
//         const matrix = new THREE.Matrix4();
//         matrix.compose(floor.position, floor.quaternion, floor.scale);

//         // Apply the transformation matrix to the geometry
//         const geometry = floor.geometry.clone(); // Clone the geometry to avoid modifying the original
//         geometry.applyMatrix4(matrix);

//         // Create an InstancedMesh with a larger number of instances
//         const count = 4; // Number of instances, for example, 9 to fill a 3x3 grid
//         const instancedMesh = new THREE.InstancedMesh(geometry, floor.material, count);
//         instancedMesh.receiveShadow = true;

//         // Set the transformation for each instance
//         const dummy = new THREE.Object3D(); // Helper object to set the transformation matrix

//         const instancesPerRow = 2; // Number of instances per row

//         for (let i = 0; i < count; i++) {
//             const x = (i % instancesPerRow) * 2; // Calculate x position
//             const z = Math.floor(i / instancesPerRow) * 2; // Calculate z position based on the row

//             dummy.position.set(x, 0, z); // Set position
//             dummy.scale.set(1, 1, 1); // Maintain original scale
//             dummy.rotation.set(0, 0, 0); // Maintain original rotation

//             dummy.updateMatrix(); // Update the transformation matrix

//             // Set the matrix for each instance
//             instancedMesh.setMatrixAt(i, dummy.matrix);
//         }

//         scene.add(instancedMesh);
//         // scene.add(rootnode)


//         gui.add(floor.material, 'wireframe')
//     },
//     () => {
//         console.log("progress")
//     },
//     () => {
//         console.log('An error happened')
//     }
// )



// /**
//  * Floor
//  */
// const material = new THREE.MeshStandardMaterial()
// material.roughness = 0.7

// // Function to create a texture from text
// function createTextTexture(text, width, height) {
//     const borderThickness = 30
//     const canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;
//     const context = canvas.getContext('2d');

//     // Draw the white background
//     context.fillStyle = 'white';
//     context.fillRect(0, 0, width, height);

//     // Set font and text alignment
//     context.font = '100px Arial';
//     context.fillStyle = 'black'; // Text color
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText(text, width / 2, height / 2);

//     // Get the image data from the canvas
//     const imageData = context.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     // Invert the colors
//     for (let i = 0; i < data.length; i += 4) {
//         data[i] = 255 - data[i];       // Red
//         data[i + 1] = 255 - data[i + 1]; // Green
//         data[i + 2] = 255 - data[i + 2]; // Blue
//         // Alpha channel remains unchanged
//     }

//     // Put the image data back to the canvas
//     context.putImageData(imageData, 0, 0);

//     // Draw the white border
//     context.lineWidth = borderThickness;
//     context.strokeStyle = 'white';
//     context.strokeRect(0, 0, width, height);

//     // Create a texture from the canvas
//     const texture = new THREE.CanvasTexture(canvas);
//     return texture;
// }

// // Create the plane with text texture
// const planeWidth = 1;
// const planeHeight = 0.5;
// const textTexture = createTextTexture('Light On', 512, 256);
// const textureLightOff = createTextTexture('Light Off', 512, 256);

// const planeMaterialOn = new THREE.MeshStandardMaterial({
//     map: textTexture,
//     alphaMap: textTexture,
//     transparent: true
// });

// const planeMaterialOff = new THREE.MeshStandardMaterial({
//     map: textureLightOff,
//     alphaMap: textureLightOff,
//     transparent: true
// });

// const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
// const plane = new THREE.Mesh(planeGeometry, planeMaterialOff);
// plane.position.set(0, 0, 0);
// plane.receiveShadow = true;

// plane.rotation.x = - Math.PI * 0.5
// plane.position.x = 1
// plane.position.y = 0.18
// plane.position.z = 2
// scene.add(plane);




// /**
//  * cubeTest Test
//  */

// const cubeTest = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({
//         color: 0xff0000
//     })
// )

// cubeTest.position.x = 2
// cubeTest.position.y = 2

// // scene.add(cubeTest)



// /**
//  * Environment map
//  */

// const rgbeLoader = new RGBELoader()

// let dayEnvironmentMap, nightEnvironmentMap;

// // Load night HDR
// rgbeLoader.load('./environmentMaps/night.hdr', (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     nightEnvironmentMap = environmentMap;

//     scene.background = nightEnvironmentMap;
//     scene.environment = nightEnvironmentMap;
//     scene.environmentIntensity = 0.1
//     scene.backgroundIntensity = 0.1

// });

// // Load day HDR
// rgbeLoader.load('./environmentMaps/day.hdr', (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     dayEnvironmentMap = environmentMap;
//     // Set the initial environment

// });



// const params1 = {
//     environment: 'night'
// };

// gui.add(params1, 'environment', ['day', 'night']).onChange((value) => {
//     if (value === 'day') {
//         scene.background = dayEnvironmentMap
//         scene.environment = dayEnvironmentMap
//         scene.environmentIntensity = 1
//         scene.backgroundIntensity = 1
//     } else {
//         scene.background = nightEnvironmentMap
//         scene.environment = nightEnvironmentMap
//         scene.environmentIntensity = 0.1
//         scene.backgroundIntensity = 0.1
//     }
// });

// scene.environmentIntensity = 1 //1 is the default
// scene.backgroundBlurriness = 0.02

// gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)


// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }



// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(4, 4, 4)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(1, 0.75, 1)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true,
//     stencil: false,
//     depth: false
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// /**
//  * Postprocessing
//  */

// const composer = new EffectComposer(renderer, { frameBufferType: THREE.HalfFloatType });

// const renderPass = new RenderPass(scene, camera);
// composer.addPass(renderPass);

// const selectiveBloomEffect = new SelectiveBloomEffect(scene, camera, {
//     luminanceThreshold: 0,
//     mipmapBlur: true
// });
// selectiveBloomEffect.ignoreBackground = true
// selectiveBloomEffect.intensity = 10

// selectiveBloomEffect.selection.add(cubeTest);

// const effectPassTone = new EffectPass(camera, selectiveBloomEffect);
// composer.addPass(effectPassTone);

// /**
//  * Mouse events
//  */

// /**
//  * Axis helper
//  */

// //adding axis helper
// const axesHelper = new THREE.AxesHelper(1);
// axesHelper.material.depthTest = false;

// if (import.meta.env.MODE === "development") {
//     scene.add(axesHelper)
// }

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//     // Update effect composer
//     // effectComposer.setSize(sizes.width, sizes.height)
//     // effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     // renderer.render(scene, camera)

//     composer.render()

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()