import { Vector3 } from "../Math/Vector3"

export class Material
{
    constructor(ambient, diffuse, specular, shininess)
    {
        if( (ambient != undefined && !(ambient instanceof Vector3)) ||
            (diffuse != undefined && !(diffuse instanceof Vector3)) ||
            (specular != undefined && !(specular instanceof Vector3)) || 
            (shininess != undefined && !(shininess instanceof Number))
        )
        {
            console.error("Invalid arguments to Vertex constructor");
            return;
        }

        this.ambient = ambient;
        this.diffuse = diffuse;

        this.specular = specular;
        this.shininess = shininess;
    }
}