#include "ShaderLoader.h"

#include "../Util/FileReader.h"

#include <glad/glad.h>
#include <stdexcept>
#include <iostream>

namespace 
{
    GLuint compileShader(const GLchar* source, GLuint shaderType)
    {   
        GLuint shaderID = glCreateShader(shaderType);

        glShaderSource(shaderID, 1, &source, nullptr);
        glCompileShader(shaderID);

        GLint isSuccess = 0;
        GLchar infoLog[512];

        glGetShaderiv(shaderID, GL_COMPILE_STATUS, &isSuccess);
        if(!isSuccess)
        {
            glGetShaderInfoLog(shaderID, 512, nullptr, infoLog);
            throw std::runtime_error ("Unable to load a shader: " + std::string(infoLog));
        }

        return shaderID;
    }
}


GLuint load_compile_shader(const std::string &filename, GLuint shaderType)
{
    auto shaderSource = getFileContents("Res/Shaders/" + filename + ".glsl");
    return compileShader(shaderSource.c_str(), shaderType);
}

