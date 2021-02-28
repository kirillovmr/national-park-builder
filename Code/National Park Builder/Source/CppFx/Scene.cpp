#include "Scene.h"
#include <imgui/imgui_impl_glfw.h>
#include <imgui/imgui_impl_opengl3.h>

#include <iostream>

void Scene::addWindow(Window &window)
{
    m_windows.push_back(&window);
}

void Scene::addWidget(Widget &widget)
{
    m_widgets.push_back(&widget);
}

void Scene::addGraphics(Graphics &graphics)
{
    m_graphics = &graphics;
}

void Scene::setSize(const iVector2 &size)
{
    m_size = size;
    m_is_size_default = false;
}

void Scene::setPosition(const iVector2 &position)
{
    m_position = position;
    m_is_position_default = false;
}

iVector2 Scene::getSize()
{
    return m_size;
}

iVector2 Scene::getPosition()
{
    return m_position;
}

bool Scene::is_size_default()
{
    return m_is_size_default;
}

bool Scene::is_position_default()
{
    return m_is_position_default;
}

void Scene::__render()
{
    render_graphics();
    ImGui_ImplOpenGL3_NewFrame();
    ImGui_ImplGlfw_NewFrame();
    ImGui::NewFrame();

    render_windows();
    render_widgets();

    ImGui::Render();
    ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());  
}

void Scene::render_windows()
{
    for(auto &window : m_windows)
    {
        window->render();
    }
}

void Scene::render_widgets()
{
    for(auto &widget : m_widgets)
    {
        widget->render();
    }
}
    
void Scene::render_graphics()
{
    if(m_graphics)
        m_graphics->render();
}