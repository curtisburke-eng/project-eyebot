import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { SDFGeometryGenerator } from 'three/addons/geometries/SDFGeometryGenerator.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer, stats, meshFromSDF, scene, camera, clock, controls;

const settings = {
	res: 4,
	bounds: 1,
	autoRotate: true,
	wireframe: true,
	material: 'depth',
	vertexCount: '0'
};

// Example SDF from https://www.shadertoy.com/view/MdXSWn -->

// const shader = /* glsl */`
// 	float dist(vec3 p) {
// 		p.xyz = p.xzy;
// 		p *= 1.2;
// 		vec3 z = p;
// 		vec3 dz=vec3(0.0);
// 		float power = 8.0;
// 		float r, theta, phi;
// 		float dr = 1.0;
		
// 		float t0 = 1.0;
// 		for(int i = 0; i < 7; ++i) {
// 			r = length(z);
// 			if(r > 2.0) continue;
// 			theta = atan(z.y / z.x);
// 			#ifdef phase_shift_on
// 			phi = asin(z.z / r) ;
// 			#else
// 			phi = asin(z.z / r);
// 			#endif
			
// 			dr = pow(r, power - 1.0) * dr * power + 1.0;
		
// 			r = pow(r, power);
// 			theta = theta * power;
// 			phi = phi * power;
			
// 			z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;
			
// 			t0 = min(t0, r);
// 		}

// 		return 0.5 * log(r) * r / dr;
// 	}
// `;

init();
animate();

function init() {

	const w = window.innerWidth;
	const h = window.innerHeight;

	camera = new THREE.OrthographicCamera( w / - 2, w / 2, h / 2, h / - 2, 0.01, 1600 );
	camera.position.z = 1100;

	scene = new THREE.Scene();

	clock = new THREE.Clock();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// stats = new Stats();
	// document.body.appendChild( stats.dom );
	
	var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.9 ); // soft white light
	scene.add( ambientLight );
	//Create a DirectionalLight and turn on shadows for the light
	var light = new THREE.DirectionalLight( 0xffffff, 0.6, 50 );
	light.position.set( 8, 8, -2 ); 			//default; light shining from top
	light.castShadow = true;            // default false
	light.intensity = 0.3;
	scene.add( light );
	scene.add( light.target );

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048; 
	light.shadow.camera.near = 0.5;
	light.shadow.camera.far = 15;    
	light.shadow.camera.left = -11;
	light.shadow.camera.right = 17;
	light.shadow.camera.top = 6;
	light.shadow.camera.bottom = -8.5;

	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;

	window.addEventListener( 'resize', onWindowResize );


	compile();

}

function compile() {

	const loader = new STLLoader();
	loader.load( './models/eye-bot.stl', function ( geometry ) {

		const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x494949, shininess: 500 } );
		const mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, - 0.25, 0.6 );
		mesh.rotation.set(  Math.PI / 2, Math.PI, -Math.PI/4);
		mesh.scale.set( 5, 5, 5 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		scene.add( mesh );

	} );

	// const generator = new SDFGeometryGenerator( renderer );
	// const geometry = generator.generate( Math.pow( 2, settings.res + 2 ), shader, settings.bounds );
	// geometry.computeVertexNormals();

	// if ( meshFromSDF ) { // updates mesh

	// 	meshFromSDF.geometry.dispose();
	// 	meshFromSDF.geometry = geometry;

	// } else { // inits meshFromSDF : THREE.Mesh

	// 	meshFromSDF = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
	// 	scene.add( meshFromSDF );

	// 	const scale = Math.min( window.innerWidth, window.innerHeight ) / 2 * 0.66;
	// 	meshFromSDF.scale.set( scale, scale, scale );

	// 	setMaterial();

	// }

	// settings.vertexCount = geometry.attributes.position.count;

}

// function setMaterial() {

// 	meshFromSDF.material.dispose();

// 	if ( settings.material == 'depth' ) {

// 		meshFromSDF.material = new THREE.MeshDepthMaterial();

// 	} else if ( settings.material == 'normal' ) {

// 		meshFromSDF.material = new THREE.MeshNormalMaterial();

// 	}

// 	meshFromSDF.material.wireframe = settings.wireframe;

// }

function onWindowResize() {

	const w = window.innerWidth;
	const h = window.innerHeight;

	renderer.setSize( w, h );

	camera.left = w / - 2;
	camera.right = w / 2;
	camera.top = h / 2;
	camera.bottom = h / - 2;

	camera.updateProjectionMatrix();

}

function render() {

	renderer.render( scene, camera );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update();

	// if ( settings.autoRotate ) {

	// mesh.rotation.y += Math.PI * 0.05 * clock.getDelta();

	// }

	render();

	// stats.update();

}