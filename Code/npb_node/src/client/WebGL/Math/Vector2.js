import { vec2 } from "../Libs/gl-matrix";

export class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add(other)
    {
        if(!(other instanceof Vector2))
        {
            console.error("Can not add 2 2D vectors. Reason: type mismatch");
            return;
        }

        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other)
    {
        if(!(other instanceof Vector2))
        {
            console.error("Can not subtract 2 2D vectors. Reason: type mismatch");
            return;
        }

        return new Vector2(this.x - other.x, this.y - other.y);
    }

    mul(other)
    {
        if(!(other instanceof Vector2))
        {
            console.error("Can not mul 2 2D vectors. Reason: type mismatch");
            return;
        }

        return new Vector2(this.x * other.x, this.y * other.y);
    }

    scale(constant)
    {
        return new Vector2(constant * this.x, constant * this.y);
    }

    toGlMatrixVec2()
    {
        vector2 = vec2.create();
        vec2.set(vector2, this.x, this.y);
        
        return vector2;
    }
}
