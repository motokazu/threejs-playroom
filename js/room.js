var world = document.getElementById('world');

var screen = {
    "w" : 500, "h" : 500
};

var loader = new THREE.XHRLoader();
loader.load('/json/scene.json', function( data ) {
    var scenejson = JSON.parse(data);
	var loader = new THREE.ObjectLoader();
    var scene = loader.parse(scenejson);
    
    // renderer
    var renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    renderer.shadowMapEnabled = true;
    renderer.setSize( screen.w, screen.h );
    renderer.setClearColor( 0x000000, 0 );
	
    // camera
	var camera = new THREE.PerspectiveCamera( 45, screen.w/screen.h, 1, 10000);
	camera.position.set( 400, 500, 650);
	
	// light
	var light = new THREE.DirectionalLight(0xffffff, 0.1);
	light.castShadow = true;
	light.position.set( 0, 100, 30);
	scene.add(light);
	
    // target object
    var targetLookAt = new THREE.Vector3( 0, 0, 0 );
    
    // camera work
    var cameraWorks = [];
    for(var i = 0;i < 10000; i++ ){
        var p = {};
        p.x = Math.sin(i/100)*20;
        p.y = Math.sin(i/100)*10+20;
        p.z = Math.cos(i/100)*20;
        
        cameraWorks.push(p);
    }
    
    
	// append dom
	world.appendChild(renderer.domElement);
	
    function animate(){
	    requestAnimationFrame(animate);
		renderer.render(scene, camera);
					
		if(cameraWorks && cameraWorks.length > 0){
			var pos = cameraWorks.shift();
		    camera.position.x = pos.x;
			camera.position.y = pos.y;
			camera.position.z = pos.z;
						
			camera.lookAt( targetLookAt );
		}
	}
	
	animate();
});
