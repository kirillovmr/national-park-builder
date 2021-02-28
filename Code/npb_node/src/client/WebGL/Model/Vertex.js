import { Vector2 } from "../Math/Vector2"
import { Vector3 } from "../Math/Vector3"

export class Vertex
{
    constructor(position, textureCoordinate, normal, color)
    {
        if( (position != undefined && !(position instanceof Vector3)) ||
            (textureCoordinate != undefined && !(textureCoordinate instanceof Vector2)) ||
            (normal != undefined && !(normal instanceof Vector3)) || 
            (color != undefined && !(color instanceof Vector3))
        )
        {
            console.error("Invalid arguments to Vertex constructor");
            return;
        }

        this.position = position;
        this.textureCoordinate = textureCoordinate;
        this.normal = normal;
        this.color = color;
    }
}