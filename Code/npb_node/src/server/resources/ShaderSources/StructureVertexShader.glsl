#version 300 es
 
layout(location = 0) in vec4 in_position;
layout(location = 1) in vec2 in_texture_coords;
layout(location = 3) in vec3 in_vertex_color;

uniform mat4 modelMatrices[250];
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

out vec2 texture_coords;
out vec3 vertex_color;

void main() 
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrices[gl_InstanceID] * vec4(in_position);
    
    texture_coords = in_texture_coords;
    vertex_color = in_vertex_color;
}