import * as THREE from "three"
import Experience from "../Experience.js"

export default class Environment
{
    constructor()
    {
        this.experience = new Experience() //Singleton!
        this.scene = this.experience.scene

        this.setSunLight()
        
    }

    setSunLight()
    {
        const sunlight = new THREE.DirectionalLight(0xffffff, 1); // White light, intensity 1
        sunlight.position.set(10, 10, -10); // Position the light in the sky
        const sunlightHelper = new THREE.DirectionalLightHelper(sunlight, 5);
        this.scene.add(sunlightHelper);

        this.scene.add(sunlight); // Add the light to the scene
        
    }
}