#ifndef GRAPHICS_H_INCLUDED
#define GRAPHICS_H_INCLUDED

#include <glad/glad.h>

class Graphics
{
public:
    // Renders one frame
    virtual void render() = 0;
};

#endif /* GRAPHICS_H_INCLUDED */ 