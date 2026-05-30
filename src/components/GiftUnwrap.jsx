import * as THREE from 'three'

export default class GiftUnwrap {
  constructor(scene, camera, renderer, onUnwrapComplete) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.onUnwrapComplete = onUnwrapComplete
    this.giftGroup = new THREE.Group()
    this.scene.add(this.giftGroup)
    
    this.isUnwrapping = false
    this.unwrapProgress = 0
    this.unwrapSpeed = 0.03
    
    this.createGiftBox()
    this.addInteraction()
  }

  createGiftBox() {
    // Create main box (gift box)
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xff1744,
      metalness: 0.3,
      roughness: 0.4
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.castShadow = true
    box.receiveShadow = true
    this.giftGroup.add(box)

    // Create lid
    const lidGeometry = new THREE.BoxGeometry(2.1, 0.3, 2.1)
    const lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5722,
      metalness: 0.2,
      roughness: 0.5
    })
    const lid = new THREE.Mesh(lidGeometry, lidMaterial)
    lid.position.y = 1.15
    lid.castShadow = true
    lid.receiveShadow = true
    this.giftGroup.add(lid)
    this.lid = lid

    // Create bow (using a torus)
    const bowGeometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100)
    const bowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.5,
      roughness: 0.3
    })
    const bow = new THREE.Mesh(bowGeometry, bowMaterial)
    bow.position.set(0, 1.3, 0)
    bow.rotation.x = Math.PI / 2
    bow.castShadow = true
    this.giftGroup.add(bow)
    this.bow = bow

    // Create wrapping paper pieces for animation
    this.paperPieces = []
    for (let i = 0; i < 8; i++) {
      const paperGeometry = new THREE.PlaneGeometry(0.8, 1.2)
      const paperMaterial = new THREE.MeshStandardMaterial({
        color: 0xffc107,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.6
      })
      const paper = new THREE.Mesh(paperGeometry, paperMaterial)
      
      const angle = (i / 8) * Math.PI * 2
      paper.position.set(
        Math.cos(angle) * 2.5,
        1,
        Math.sin(angle) * 2.5
      )
      
      this.paperPieces.push({
        mesh: paper,
        velocity: new THREE.Vector3(
          Math.cos(angle) * 0.02,
          0.01,
          Math.sin(angle) * 0.02
        ),
        rotationVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        )
      })
    }

    // Initial rotation
    this.giftGroup.rotation.x = 0.3
    this.giftGroup.rotation.y = 0.5
  }

  addInteraction() {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseClick = (event) => {
      if (this.isUnwrapping) return

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, this.camera)
      const intersects = raycaster.intersectObjects(this.giftGroup.children)

      if (intersects.length > 0) {
        this.startUnwrap()
      }
    }

    window.addEventListener('click', onMouseClick)
    this.onMouseClick = onMouseClick
  }

  startUnwrap() {
    this.isUnwrapping = true
    
    // Add paper pieces to scene
    this.paperPieces.forEach(piece => {
      this.scene.add(piece.mesh)
    })
  }

  update() {
    if (this.isUnwrapping) {
      this.unwrapProgress += this.unwrapSpeed

      if (this.unwrapProgress <= 1) {
        // Lift the lid
        this.lid.position.y = 1.15 + this.unwrapProgress * 2

        // Rotate lid away
        this.lid.rotation.x = this.unwrapProgress * Math.PI * 0.3

        // Fade out the main box
        this.giftGroup.children[0].material.opacity = 1 - this.unwrapProgress * 0.5
        this.giftGroup.children[0].material.transparent = true

        // Animate bow
        this.bow.scale.set(
          1 - this.unwrapProgress * 0.3,
          1 - this.unwrapProgress * 0.3,
          1 - this.unwrapProgress * 0.3
        )

        // Animate paper pieces
        this.paperPieces.forEach(piece => {
          piece.mesh.position.add(piece.velocity)
          piece.mesh.rotation.x += piece.rotationVelocity.x
          piece.mesh.rotation.y += piece.rotationVelocity.y
          piece.mesh.rotation.z += piece.rotationVelocity.z
          
          // Fade out paper
          piece.mesh.material.opacity = 1 - this.unwrapProgress
          piece.mesh.material.transparent = true

          // Fall down
          piece.velocity.y -= 0.0005
        })
      } else {
        // Unwrap complete
        if (this.onUnwrapComplete) {
          this.onUnwrapComplete()
        }
        this.isUnwrapping = false
      }
    } else {
      // Gentle rotation when not unwrapping
      this.giftGroup.rotation.x += 0.001
      this.giftGroup.rotation.y += 0.002
    }
  }

  dispose() {
    if (this.onMouseClick) {
      window.removeEventListener('click', this.onMouseClick)
    }
  }
}
