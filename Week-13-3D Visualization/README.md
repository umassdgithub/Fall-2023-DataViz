
# ThreeJS
## Initiating a Scene and adding Geometry and Controller

The basic TheeJS visualization contains the following main parts





1. **Initiate the Scene Object**  
Create a new instance of the Scene Object.

 ```
const scene = new THREE.Scene();
  ```
2. **New Instance of the Camera:<br>**
Create a new instance of the PerspectiveCamera.

```
const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
```

3. **Set the Position of the Camera<br>**
Define the camera's position in the space.

```
camera.position.z = 25;
```
4. **Set the Light<br>**
Configure and position the PointLight.

```
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);
```
5. **New Instance of the WebGL Renderer<br>**
Create a new SphereBufferGeometry instance.

```
const geometry = new THREE.SphereBufferGeometry(1, 1, 1);
```

6. **Initiate the Material for the Geometry<br>**
Define the material properties.

```
const meshColor = "#ff9999";
const material = new THREE.MeshPhongMaterial({ color: meshColor, shininess: 100 });
```

7. **Generate the Mesh for the Geometry<br>**
Create the mesh using the defined geometry and material.

```
let mesh = new THREE.Mesh(geometry, material);
```

8. **Locate the Geometry's Mesh in the Space<br>**
Set the position and rotation of the mesh.

```
const x = 0, y = 0, z = 0;
mesh.position.set(x, y, z);
mesh.rotation.set(0, 0, 0);
```

9. **Add the Mesh to the Scene<br>**
Include the mesh in the scene.

```
scene.add(mesh);
```

10. **Initiate a Renderer<br>**
Configure the WebGLRenderer.

```
let renderer = new THREE.WebGLRenderer({ antialias: true });
```

11. **Set Space Color<br>**
Define the background color of the space.

```
const spaceColor = "#f5f5f5";
renderer.setClearColor(spaceColor);
renderer.setSize(512, 512);
```

12. **Add Controller to the Renderer<br>**
Integrate OrbitControls for interaction.

```
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
```

13. **Append the Renderer to the Body<br>**
Attach the rendering canvas to the document body.

```
document.body.appendChild(renderer.domElement);
```

14. **Render Scene and Camera<br>**
Create the animate function for rendering.

```
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}
animate();
```