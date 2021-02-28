import { ModelController } from "../controllers"

export class Texture2D
{
    constructor(gl)
    {
        this.gl = gl;
        this.texture = this.gl.createTexture();

        this.textureLoaded = false;
    }

    async loadFromServer(textureName)
    {
        let gl = this.gl;

        let imageObj = await ModelController.getImage(textureName);
        let url = URL.createObjectURL(imageObj);
        
        const image = new Image();
        image.onload = () => 
        {
            gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                gl.RGBA, gl.UNSIGNED_BYTE, image);
            
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
        image.src = url;

        this.textureLoaded = true;
    }

    bind()
    {
        if(!this.textureLoaded)
        {
            console.error("Texture not loaded!");
            return;
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }
}