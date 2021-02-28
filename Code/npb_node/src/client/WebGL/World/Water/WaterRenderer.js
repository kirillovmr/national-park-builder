import { WaterShader } from "../../Shader/WaterShader";
import { Mesh } from "../../Model/Mesh"
import { Model } from "../../Model/Model"
import { mat4, vec3 } from "../../Libs/gl-matrix" 

export class WaterRenderer
{
    constructor(gl)
    {
        this.gl = gl;
    }

    init()
    {
        let gl = this.gl;
        this.waterShader = new WaterShader(gl);
        this.waterShader.loadFromServer();

        // let vertices = [
        //     -50, -10, -50,
        //     50, -10, -50,
        //     -50,  -10, 50,
        //     50,  -10, 50,
        // ];
    
        // let texture_coords = [
        //     0, 0,
        //     1, 0,
        //     0, 1,
        //     1, 1,
        // ];
    
        // let indices = [ 
        //     1, 0, 2,
        //     2, 3, 1
        // ];

        let mesh = new Mesh();
        mesh.vertexPositions = [
            0, 1.5, 0,
            100, 1.5, 0,
            0,  1.5, 100,
            100, 1.5, 100,
        ];

        mesh.indices = [ 
            1, 0, 2,
            2, 3, 1
        ];

        this.model = new Model(gl);
        this.model.addVertexPositions(mesh.vertexPositions);
        this.model.addTextureCoordinates(mesh.textureCoordinates);
        this.model.addIndices(mesh.indices);
        this.indices_length = mesh.indices.length;

        this.gl = gl;
    }

    render(camera)
    {
        if(!this.waterShader.shadersLoaded)
        {
            return;
        }

        let gl = this.gl;

        this.waterShader.bind();
        this.model.bindVAO();

        let worldMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        let translation = vec3.create();
        vec3.set(translation, 0, 0, 0);
        mat4.translate(worldMatrix, worldMatrix, translation);

        this.waterShader.loadModelMatrix(worldMatrix);
        this.waterShader.loadViewMatrix(camera.getViewMatrix());
        this.waterShader.loadProjectionMatrix(camera.getProjectionMatrix());

        gl.drawElements(gl.TRIANGLES, this.indices_length, gl.UNSIGNED_SHORT, 0);
    }
}