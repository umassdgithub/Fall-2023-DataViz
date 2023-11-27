function myThreeJSV001()
{
    const spaceColor="#e5e5e5"
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 10;

    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(spaceColor);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableZoom = true;
    return [scene,camera,renderer,controls]
}
function render ()
{
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
function cube(scene,color,x,y,z,width=.3,height=.3,depth=.3)
{
    let geometry = new THREE.BoxGeometry(width, height, depth);
    let material = new THREE.MeshBasicMaterial();
    material.color.setStyle(color);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(0,0,0);
    scene.add(mesh);
}