import * as THREE from 'three'

Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

// THREE.js
scene = new THREE.Scene();

var canvasHeight = 570;
var canvasWidth = $('#robot').width() - 5;

var camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.set(3.16, 1.92, 2.76);


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0xf0f0f0);
renderer.setSize(canvasWidth*2, canvasHeight*2);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.domElement.id = 'robotcanvas';
renderer.domElement.style.width = canvasWidth + 'px';
renderer.domElement.style.height = canvasHeight + 'px';

document.getElementById('robot').appendChild(renderer.domElement);


// Light sources

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

//Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.9 ); // soft white light
scene.add( ambientLight );



var grouper = new modelGrouper( camera, $('#robot')[0], scene);
grouper.initGroupData(groups);

// Robot - load colored binary STL
var loaderColored = new THREE.STLLoader( );

var loaded = 0;
var to_load = 0;

var	meshMaterial = new THREE.MeshStandardMaterial({
	//opacity : geometry.alpha,
	vertexColors : THREE.VertexColors,
	side : THREE.FrontSide,
	metalness: 0.1,
	roughness: 0.88,
});

function createMesh(meshName){
	return function(geometry){
				mesh = new THREE.Mesh(geometry, meshMaterial);
				mesh.scale.set(1, 1, 1);
				mesh.position.set(0,0,0);
				mesh.name = meshName;
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				mesh.visible = true;
				grouper.meshes[meshName].mesh = mesh;
				scene.add(mesh)
				loaded++;
				setup_models();
			}
}

for (var meshName in grouper.meshes) {
	to_load++;
	loaderColored.load( "stl/robot/" + meshName, createMesh(meshName) );
}

function setup_models() {
	if (loaded >= to_load) {
		grouper.buildGroups(groups);
//			grouper.initTree($('#modelTree'));
//			grouper.model.Base.rotation.set(Math.PI/2,0,0)
		// Start render loop
		requestAnimationFrame(render);

	}
}


init();


function init() {
	// Update camera and renderer settings if the window is resized
	window.addEventListener('resize', onWindowResize, false);

	// Initialize orbit controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.5, 0);
}

function onWindowResize() {

	canvasWidth = $('#robot').width() - 5;

	camera.aspect = canvasWidth / canvasHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(canvasWidth*2, canvasHeight*2);
	renderer.domElement.style.width = canvasWidth + 'px';
	renderer.domElement.style.height = canvasHeight + 'px';

	window.addEventListener('resize', onWindowResize, false);
}


function render() {
	requestAnimationFrame(render);
	controls.update();
	// shadowcamhelper.update();
	// spotLightHelper.update();

	// Render and update stats
	renderer.render(scene, camera);
	try{
		grouper.update();
	} catch(e) {
					
	}
}
//}());
// closure
