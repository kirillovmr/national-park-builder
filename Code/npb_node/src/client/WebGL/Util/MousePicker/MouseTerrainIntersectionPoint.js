import { Vector2 } from "../../Math/Vector2"
import { Vector3 } from "../../Math/Vector3"
import { MousePickerRay } from "./MousePickerRay"

import { Camera } from "../../Camera"
import NoiseGenerator from "../../Math/NoiseGenerator" 

class MouseTerrainIntersectionPoint
{
    constructor()
    {
        this.rayLength = 100;
        this.bsFactor = 100;
    }

    setCamera(camera)
    {
        if(!(camera instanceof Camera))
        {
            console.error("Invalid arguments to RayTerrainIntersection constructor");
            return;
        }

        this.camera = camera;
    }

    getIntersectionPoint(wmPos)
    {
        if(!(wmPos instanceof Vector2))
        {
            console.error("Invalid arguments to getIntersectionPoint");
            return;
        }

        return this.__binarySearch(0, 0, this.rayLength, MousePickerRay.getCurrentRay(wmPos, this.camera));
    }


    __binarySearch(cnt, start, finish, ray)
    {
        let mid = start + ((finish - start) / 2);

        if(cnt >= this.bsFactor)
        {
            let endpoint = this.__getPointOnRay(ray, finish);
            return endpoint;
        }

        if(this.__isIntersectionInRange(start, mid, ray))
        {
            return this.__binarySearch(cnt + 1, start, mid, ray);
        } 
        else 
        {
            return this.__binarySearch(cnt + 1, mid, finish, ray);
        }
    }


    __isIntersectionInRange(start, finish, ray)
    {
        return  this.__isPointUnderGround( this.__getPointOnRay(ray, start) ) === false &&
                this.__isPointUnderGround( this.__getPointOnRay(ray, finish) ) === true;
    }


    __isPointUnderGround(pointOnRay)
    {
        let heightOfTerrain = NoiseGenerator.getLevel( pointOnRay.x, pointOnRay.z );
        return pointOnRay.y < heightOfTerrain;
    }


    __getPointOnRay(ray, distance)
    {
        return ray.scale(distance).add(this.camera.cameraPos)
    }
}

export default new MouseTerrainIntersectionPoint()