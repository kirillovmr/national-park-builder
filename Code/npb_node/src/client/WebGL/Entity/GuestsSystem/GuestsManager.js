import { Guest } from "./Guest"
import { GuestsRenderer } from "./GuestsRenderer"

import { ObjectLoader } from "../../ObjectLoader/ObjectLoader"
import { ObjectLoaderParameters } from "../../ObjectLoader/ObjectLoaderParameters"

import MouseTerrainIntersectionPoint from "../../Util/MousePicker/MouseTerrainIntersectionPoint"
import { Vector2 } from "../../Math/Vector2";

// All guest have the same mesh
export class GuestsManager
{
    constructor(gl, modelDatabase)
    {
        this.modelDatabase = modelDatabase;
       
        let params = new ObjectLoaderParameters();
        params.loadNormals = false;
        params.loadColors = true;
        this.guestMesh = ObjectLoader.parse("guest", params, modelDatabase["guest"].obj, modelDatabase["guest"].mtl);

        this.guests = [];
        this.guestsRenderer = new GuestsRenderer(gl);
    }

    // Adding at the center of the screen
    addGuest()
    {
        let canvas = document.getElementById('canvas');
        let width = canvas.width;
        let height = canvas.height; 

        let position = MouseTerrainIntersectionPoint.getIntersectionPoint(new Vector2(width / 2 + Math.random() * 150 - 75, height / 2 + Math.random() * 150 - 75));
        position.z += 13
        let newGuest = new Guest(this.guestMesh, position, 90);

        this.guests.push(newGuest);
        this.guestsRenderer.addGuest(newGuest);
    }

    removeGuest()
    {
        this.guests.pop();
        this.guestsRenderer.removeGuest();
    }

    displayGuests(camera)
    {       
        if(this.guests.length > 0)
        {
            for(let i = 0; i < this.guests.length; i++)
            {
                this.guests[i].update();
            }

            this.guestsRenderer.render(camera);
        }
    }
}