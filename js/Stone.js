class Stone
{
    constructor(x, y, w, h)
    {
        let options={
            restitution: 0.8
        }

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.image = loadImage("./assets/stone.png");

        World.add(world, this.body);
    }

    display(){
        let pos = this.body.position;
        push()
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.image, 0, 0, this.w, this.h);
        pop()
    }
}