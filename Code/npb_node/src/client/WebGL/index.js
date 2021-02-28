import { ModelController, TESTController } from "./controllers"

import { Texture2D } from "./Texture/Texture2D"
import { Camera } from "./Camera"
// import { TerrainGenerator } from "./World/Generation/TerrainGenerator"
import { MapGenerator } from "./World/MapSystem/MapGenerator"
import { DummyBuildingManager } from  "./BuildSystem/DummyBuildingManager"

import { StructuresManager } from "./Entity/StructuresSystem/StructuresManager"
import { GuestsManager } from "./Entity/GuestsSystem/GuestsManager"

import NoiseGenerator from  "./Math/NoiseGenerator"

import MouseTerrainIntersectionPoint from "./Util/MousePicker/MouseTerrainIntersectionPoint"

import { MapManager } from "./World/MapSystem/MapManager"


class WebGL 
{
    constructor() 
    {
        let canvas = document.getElementById("canvas");
        let gl = canvas.getContext("webgl2");
    
        if(!gl)
        {
            alert("Your browser does not support WebGL");
            return;
        }
        console.log("Success");
        
        // Attach a resize listener to make canvas always full wigth && height
        // window.addEventListener('resize', e => {
        //     canvas.style.width = `${e.target.innerWidth}px`;
        //     canvas.style.height = `${e.target.innerHeight}px`;
        // });

        gl.viewport(0, 0, 1920, 1080);

        this.gl = gl;
    }

    // To be called once we are loading the web page
    async init(seed, cameraPos) 
    {
        this.done_loading = false;
        let gl = this.gl;

        NoiseGenerator.reset(seed);

        this.camera = new Camera(cameraPos, 30);
        MouseTerrainIntersectionPoint.setCamera(this.camera);


        const MODELS = await ModelController.getAllModels();
        console.warn(MODELS);


        this.guestsManager = new GuestsManager(gl, MODELS);
        // for(let i=0; i<99; i++)
        //     this.guestsManager.addGuest();
        this.dummyBuildingManager = new DummyBuildingManager(gl, MODELS);
        this.structuresManager = new StructuresManager(gl, MODELS);

        this.mapManager = new MapManager(gl, MODELS);

        let serverMeshes = await ModelController.getMapMeshes(seed);
        // if (serverMeshes.length > 0) {
        if(false) 
        {
            this.mapManager.setMapMeshes(serverMeshes);
        }
        else 
        {
            this.mapManager.generateMapMeshes(seed);
        }

        this.done_loading = true;
        this.fps = 0;
    }

    loop() 
    {
        if(!this.done_loading)
        {
            requestAnimationFrame(this.loop.bind(this));
            return;
        }

        // PRINT FPS
        // setTimeout(() => {console.log("FPS = " + this.fps);}, 1000);

        let gl = this.gl;

        gl.clearColor(0.694117, 0.956862, 0.976470, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        this.camera.processKeyBoardInput();

        // console.log(this.dummyBuildingManager.getDummyBuilding().isPositionOk());

        // this.waterRenderer.render(this.camera);
        this.guestsManager.displayGuests(this.camera);
        this.dummyBuildingManager.proccessUserInput();
        this.dummyBuildingManager.displayDummyBuilding(this.camera);

        this.mapManager.displayMap(this.camera);
        // this.terrainRenderer.render(this.camera);

        this.structuresManager.displayStructures(this.camera);

        // this.fps++;

        requestAnimationFrame(this.loop.bind(this));
    }
}

// That class is being exported as a singleton instance
// and imported in App.js in order to instantiate it
export default new WebGL()
