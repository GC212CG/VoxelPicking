window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
	const renderer = new THREE.WebGLRenderer({canvas});
	
	//camera setting
	var per_view=1; //1 : perspective(default), 0 : orthographic
	const per_cam = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.01, 1000);
	per_cam.position.z = 3;
	const ortho_cam = new THREE.OrthographicCamera(-6,6,3,-3,0.01, 1000 );
	//camera setting
	
	const scene = new THREE.Scene();

	{
		const color = 0xFFFFFF;
		const intensity = 2;
		const light = new THREE.DirectionalLight(color, intensity);
		const light2 = new THREE.DirectionalLight(color, intensity);
		light.position.set(-3, 5, 5);
		light2.position.set(3, -5, -5);
		scene.add(light);
		scene.add(light2);
	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	function makeInstance(geometry, color, x,y,z) {
		const material = new THREE.MeshPhongMaterial({
			color,
			opacity:0.8,
			transparent: true
		});

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.position.x = x;
		cube.position.y = y;
		cube.position.z = z;

		return cube;
	}

	const cubes = [
		makeInstance(geometry, 0x44aa88,  0, 0, 0),
		makeInstance(geometry, 0x8844aa, -1, 1, -1),
		makeInstance(geometry, 0xaa8844,  1, -1, 0),
	];
	
	//camera button
	document.getElementById("Button0").onclick = function(){ //정면도
		ortho_cam.position.z = 3;
		ortho_cam.position.x = 0;
		ortho_cam.position.y = 0;
		ortho_cam.lookAt(new THREE.Vector3(0,0,-3))
		per_view = 0 //orthographic
	};
	document.getElementById("Button1").onclick = function(){ //좌측면도
		ortho_cam.position.z = 0;
		ortho_cam.position.x = -3;
		ortho_cam.position.y = 0;
		ortho_cam.lookAt(new THREE.Vector3(3,0,0))
		per_view = 0 //orthographic
	};
	document.getElementById("Button2").onclick = function(){ //평면도
		ortho_cam.position.z = 0;
		ortho_cam.position.x = 0;
		ortho_cam.position.y = 3;
		ortho_cam.lookAt(new THREE.Vector3(0,-3,0))
		per_view = 0 //orthographic
	};
	document.getElementById("Button3").onclick = function(){ //입체도
		per_cam.position.z = 3;
		per_cam.position.x = 0;
		per_cam.position.y = 0;
		per_view = 1 //perspective
	};
	//camera button
	
	//camera render
	var controls = new THREE.OrbitControls (per_cam, renderer.domElement);
	//camera control - perspective
	var framesPerSecond=60;
	var animate = function () {
		if(per_view==1){
			controls.update();
			renderer.render( scene, per_cam ); //perspective
		}
		if(per_view==0){
			renderer.render( scene, ortho_cam ); //orthographic
		}
		setTimeout(function() {
			requestAnimationFrame(animate); 
		}, 1000 / framesPerSecond);
	};
	animate();
	//camera render
	
}
