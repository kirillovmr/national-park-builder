#include "Stage.h"

#include "GLFW/glfw3.h"


void Stage::setScene(Scene &scene)
{
    m_scene = &scene;

    if(m_scene->is_size_default() == false)
        this->setSize(m_scene->getSize());

    if(m_scene->is_position_default() == false)
        this->setPosition(m_scene->getPosition());
}

void Stage::show()
{
    if(m_scene == nullptr)
    {
        throw std::runtime_error("Can not show the stage because scene is not attached\n");
    }

    auto stage = m_context.get_context();
    GLfloat background_color[] = {0.2, 0.3, 0.25, 1.0};
    
    while(!glfwWindowShouldClose(stage.get()))
    {
        glClearBufferfv(GL_COLOR, 0, background_color);
        m_scene->__render();
        
        glfwSwapBuffers(stage.get());
        glfwPollEvents();
    }
}

void Stage::setTitle(const std::string &title)
{
    glfwSetWindowTitle(m_context.get_context().get(), title.c_str());
}

void Stage::__setContext(Context context)
{
    m_context = context;
}

void Stage::setSize(const iVector2 &size)
{
    glfwSetWindowSize(m_context.get_context().get(), size.x, size.y);
}

void Stage::setPosition(const iVector2 &position)
{
    glfwSetWindowPos(m_context.get_context().get(), position.x, position.y);
}