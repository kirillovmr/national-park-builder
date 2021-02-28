function compileShader(gl, shaderSourceCode, shaderType)
{
    let shader = gl.createShader(shaderType);
    
    gl.shaderSource(shader, shaderSourceCode);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error("Shader Compile Error: " + gl.getShaderInfoLog(shader));
    }
    else
    {
        console.log("Shader Compiled Successfully");
    }

    return shader;
}

function linkProgram(gl, vertexShader, fragmentShader)
{
    let shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    return shaderProgram;
}

export function BuildProgram(gl, vertexShaderSourceCode, fragmentShaderSourceCode)
{
    let vertexShader = compileShader(gl, vertexShaderSourceCode, gl.VERTEX_SHADER);
    let fragmentShader = compileShader(gl, fragmentShaderSourceCode, gl.FRAGMENT_SHADER);

    let program = linkProgram(gl, vertexShader, fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
    {
        console.error("Program Link Error: " + gl.getProgramInfoLog(program));
    }
    else 
    {
        console.log("Program linked successfully");
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
}