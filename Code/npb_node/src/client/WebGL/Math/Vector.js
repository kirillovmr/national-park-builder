import { vec2, vec3, vec4 } from "../Libs/gl-matrix";

// returns true if vec1 and vec2 arguments are of correct type
// false otherwise
function VectorArgTypesChecker(vec1, vec2)
{
    if(typeof vec1 != typeof vec2)
    {
        console.error("Can not add 2 vectors of different size");
        return false;
    }
    if(!(vec1 instanceof Vector2) && !(vec1 instanceof Vector3) && !(vec1 instanceof Vector4))
    {
        console.error("The type of vec1 argument must be a vector type");
        return false;
    }
    if(!(vec2 instanceof Vector2) && !(vec2 instanceof Vector3) && !(vec2 instanceof Vector4))
    {
        console.error("The type of vec2 argument must be a vector type");
        return false;
    }
    return true;
}


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

