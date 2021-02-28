import KeyBoardInput from "../Input/KeyBoardInput"
import MouseInput from "../Input/MouseInput" 
import { Vector2 } from "../Math/Vector2";

import { DummyBuilding } from "./DummyBuilding"

import { MousePickerRay } from "../Util/MousePicker/MousePickerRay"
import MouseTerrainIntersectionPoint from "../Util/MousePicker/MouseTerrainIntersectionPoint"

export class DummyBuildingInputHandler
{
    constructor()
    {   
        this.dummyBuilding = null;

        KeyBoardInput.addRotationHandler(() => {
            this.dummyBuilding.rotate90degCW();
        })
    }

    setDummyBuilding(dummyBuilding)
    {
        if(!(dummyBuilding instanceof DummyBuilding))
        {
            console.error("Invalid arguments to DummyBuildingRenderer constructor");
            return; 
        }

        this.dummyBuilding = dummyBuilding;
    }

    removeDummyBuilding()
    {
        this.dummyBuilding = null;
    }


    proccessUserInput()
    {   
        if(this.dummyBuilding === null)
        {
            return;
        }

        if(MouseInput.mousePressed && MouseInput.mouseMoved)
        {
            this.dummyBuilding.setPosition(
                MouseTerrainIntersectionPoint.getIntersectionPoint(new Vector2(MouseInput.mouseCurX, MouseInput.mouseCurY))
            );
        }
    }
}