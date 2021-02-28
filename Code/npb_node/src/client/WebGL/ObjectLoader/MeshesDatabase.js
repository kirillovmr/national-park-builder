import { Mesh } from "../Model/Mesh"

class MeshesDatabase
{
    constructor()
    {
        this.meshes = {};
    }

    getMesh(modelId)
    {
        if(!this.meshes[modelId])
        {
            // console.error("No such model in the database. Parse it first.");
            return null;
        }

        return this.meshes[modelId];   
    }

    addMesh(modelId, mesh)
    {
        if(!(mesh instanceof Mesh))
        {
            console.error("Invalid arguments to addMesh method in MeshesDatabase");
            return null;
        }

        // if already in a database then do nothing
        if(modelId && this.meshes[modelId])
        {
            return;
        }

        this.meshes[modelId] = mesh;
    }
}

export default new MeshesDatabase()
