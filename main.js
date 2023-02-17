import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

async function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })

  const camera = new function() {
    const fov = 70 // field of view
    const aspect = canvas.clientWidth/canvas.clientHeight
    const near = 1
    const far = 4
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
  }
  camera.position.z = 3 // 相机位置

  const scene = new THREE.Scene()

  { // light
    const color = 0xFFFFFF
    const intensity = 2
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(1, 10, 10)
    scene.add(light)
  }

  const loader = new function() {
    const result = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    result.setDRACOLoader(dracoLoader)
    // const gltf = await loader.loadAsync('/demo/scene.gltf')
    return result
  }

  const gltf = await loader.loadAsync('./model/skirt.glb')
  scene.add(gltf.scene)
  
  function render(time) {
    time *= 0.001;  // 将时间单位变为秒
    // gltf.scene.rotation.x = time
    gltf.scene.rotation.y = time

    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if(canvas.width != width || canvas.height != height) {
      renderer.setSize(width, height, false)
      camera.updateMatrix()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
}

main()