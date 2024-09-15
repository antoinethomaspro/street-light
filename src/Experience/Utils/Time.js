import EventEmitter from "./EventEmitter.js"

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        
        //we wait one frame by using requestAnimationFrame
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger("tick")

        // Loop
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}