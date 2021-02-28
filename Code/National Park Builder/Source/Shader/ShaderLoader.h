#ifndef ShaderLoader_h
#define ShaderLoader_h

#include <string>
#include <glad/glad.h>

GLuint load_compile_shader(const std::string &filename, GLuint shaderType);

#endif // ShaderLoader_h
