import * as THREE from "three"
import Experience from "../Experience.js"
import Environment from "./Environment.js"

export default class World
{
    constructor()
    {
        this.experience = new Experience() //Singleton!
        this.scene = this.experience.scene

        

        const gridHelper = new THREE.GridHelper(20, 20);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(1);
        this.scene.add(axesHelper);

        // Test Mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        )
        testMesh.position.x = 2
        testMesh.position.y = 2
        testMesh.position.z = 5
        this.scene.add(testMesh)

        // Setup
        this.environment = new Environment()
    }
}