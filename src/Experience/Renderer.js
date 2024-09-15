import * as THREE from "three"
import Experience from "./Experience.js"

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience() //Singleton!
        this.canvas = this.experience.canvas
        this.size = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            stencil: false,
            depth: false
        })
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.size.width, this.size.height)
        this.instance.setPixelRatio(this.size.pixelRatio)
    }

    resize()
    {
        this.instance.setSize(this.size.width, this.size.height)
        this.instance.setPixelRatio(this.size.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }

}