// import React, { useRef, useEffect } from 'react';
// // import { Canvas, useFrame } from 'react-three-fiber'
// import * as THREE from 'three';

// const Background = () => {
//   const HeroInteractive = useRef();
//   //   const [hovered, setHover] = useState(false)
//   //   const [active, setActive] = useState(false)

//   const createHeroInteractive = $container => {
//     //   'use strict';
//     //   // prettier-ignore
//     let renderer,
//       scene,
//       camera,
//       pixelRatio = Math.min(window.devicePixelRatio, 2),
//       fov = 45;

//     let mousePosition = {
//       x: 0.5,
//       y: 0.5
//     };
//     let v2MousePosition = new THREE.Vector2(mousePosition.x, mousePosition.y);

//     let start = Date.now();
//     let fixedTime = 0,
//       lastFixedTime = 0,
//       timeDelta = 0,
//       timeOffset = 0,
//       dynamicTime = 0;

//     let renderUpdates = {
//       rotate: []
//     };

//     let w, h, isMobile;

//     let camX = 0,
//       camY = 0;

//     let isFocused = true,
//       isInited = false,
//       inViewport = false;

//     // window.addEventListener('blur', function() {
//     //   isFocused = false;
//     // });
//     // window.addEventListener('focus', function() {
//     //   if (!isFocused) {
//     //     isFocused = true;
//     //     if (isInited) {
//     //       render();
//     //     }
//     //   }
//     // });

//     function updateSize() {
//       w = $container.current.offsetWidth;
//       h = $container.current.offsetHeight;
//       isMobile = w < 800;
//       pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : 1;
//     }

//     var loadedAssetsCount = 0;
//     var requiredAssetsCount = 1;

//     function hasEverythingLoaded() {
//       if (loadedAssetsCount === requiredAssetsCount) {
//         init();
//       }
//     }

//     var textureLoader = new THREE.TextureLoader();

//     var imageTexture1Width, imageTexture1Height;
//     var imageTexture1 = textureLoader.load('/arquivos/lp-frida-about.jpg', function(texture) {
//       imageTexture1Width = texture.image.width;
//       imageTexture1Height = texture.image.height;
//       texture.generateMipmaps = false;
//       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//       texture.minFilter = THREE.LinearFilter;

//       loadedAssetsCount++;
//       hasEverythingLoaded();
//     });

//     // var imageTexture2Width, imageTexture2Height;
//     // var imageTexture2 = textureLoader.load('/assets/beauty-raw.jpg', function(texture) {
//     //   imageTexture2Width = texture.image.width;
//     //   imageTexture2Height = texture.image.height;
//     //   texture.generateMipmaps = false;
//     //   texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//     //   texture.minFilter = THREE.LinearFilter;

//     //   loadedAssetsCount++;
//     //   hasEverythingLoaded();
//     // });

//     function init() {
//       updateSize();

//       console.log('Textura: ' + imageTexture1);
//       console.log(imageTexture1);

//       scene = new THREE.Scene();

//       camera = new THREE.PerspectiveCamera(fov, w / h, 1, 500);
//       camera.position.z = isMobile ? 200 : 150;

//       scene.add(camera);

//       let position = new THREE.Vector3(0, 0, 0);
//       let scale = new THREE.Vector3(1, 1, 1);
//       let geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
//       let uniforms = {
//         uTexture: {
//           //texture data
//           value: null
//         },
//         uOffset: {
//           //distortion strength
//           value: new THREE.Vector2(0.0, 0.0)
//         },
//         uAlpha: {
//           //opacity
//           value: 0
//         }
//       };
//       let material = new THREE.ShaderMaterial({
//         uniforms: uniforms,
//         vertexShader: `
//        uniform vec2 uOffset;
//        varying vec2 vUv;

//        void main() {
//          vUv = uv;
//          vec3 newPosition = position;
//          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
//        }
//      `,
//         fragmentShader: `
//        uniform sampler2D uTexture;
//        uniform float uAlpha;
//        varying vec2 vUv;

//        void main() {
//          vec3 color = texture2D(uTexture,vUv).rgb;
//          gl_FragColor = vec4(color,1.0);
//        }
//      `,
//         transparent: true
//       });
//       let plane = new THREE.Mesh(geometry, material);
//       scene.add(plane);

//       renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
//       renderer.setPixelRatio(pixelRatio);
//       renderer.setSize(w, h);
//       renderer.setClearColor(new THREE.Color('rgb(255,255,255)'));

//       $container.current.appendChild(renderer.domElement);

//       window.addEventListener('resize', handleResize);
//       // if ('ontouchstart' in window) {
//       //   document.body.addEventListener('touchmove', handleTouchMove);
//       // } else {
//       //   document.body.addEventListener('mousemove', handleMouseMove);
//       // }

//       isInited = true;
//       render();
//     }

//     function handleResize() {
//       updateSize();
//       renderer.setSize(w, h);
//       renderer.setPixelRatio(pixelRatio);
//       camera.aspect = w / h;
//       camera.position.z = isMobile ? 200 : 150;

//       camera.updateProjectionMatrix();
//     }

//     // function handleTouchMove(e) {
//     //   var touch = e.touches[0];
//     //   mousePosition.x = touch.pageX / w;
//     //   mousePosition.y = touch.pageY / h;
//     // }

//     // function handleMouseMove(e) {
//     //   mousePosition.x = e.pageX / w;
//     //   mousePosition.y = e.pageY / h;
//     // }

//     function render(timestamp) {
//       if (isFocused) {
//         camX = ((mousePosition.x - 0.5) * (isMobile ? 120 : 100) - camera.position.x) * 0.05;
//         camY = ((mousePosition.y - 0.5) * (isMobile ? 80 : 60) - camera.position.y) * 0.05;

//         camera.position.x += camX;
//         camera.position.y += camY;
//         camera.position.z += camY;
//         camera.lookAt(scene.position);

//         renderer.render(scene, camera);
//         requestAnimationFrame(render);
//       }
//     }
//   };

//   useEffect(() => {
//     createHeroInteractive(HeroInteractive);
//   }, []);

//   return <div className="hover-text" ref={HeroInteractive}></div>;
// };

// export default Background;
