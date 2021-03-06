#version 300 es
precision highp float;

in vec2 texture_coords;
out vec4 outColor;

uniform sampler2D crate_texture;

void main() 
{
    // outColor = vec4(texture_coords, 0.0, 1.0);
    outColor = texture(crate_texture, texture_coords);
}