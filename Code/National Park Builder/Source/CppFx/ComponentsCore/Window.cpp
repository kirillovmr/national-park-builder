#include "Window.h"

// Window::Window()
// {
//     WindowManager::get_instance().add_window(*this);
// }

void Window::render()
{   
    if(this->is_open() == false)
        return;

    ImGui::Begin(m_title.c_str(), nullptr, m_flags);

    // ImGui::SetWindowCollapsed(this->is_hidden());

    this->setup_window();
    this->setup_widgets();

    ImGui::End();
}

void Window::setSize(const ImVec2 &size)
{
    ImGui::SetWindowSize(size);
}

void Window::setPosition(const ImVec2 &pos)
{
    ImGui::SetWindowPos(pos);
}

void Window::set_flags(WindowFlagsType flags)
{
    m_flags = flags;
}

void Window::setTitle(const std::string &title)
{
    m_title = title;
}

void Window::setFontScale(float scale)
{
    ImGui::SetWindowFontScale(scale);
}

void Window::open()
{
    m_is_open = true;
}

void Window::close()
{
    m_is_open = false;
}

void Window::hide()
{
    m_is_hidden = true;
}

void Window::show()
{
    m_is_hidden = false;
}

bool Window::is_open()
{
    return m_is_open;
}

bool Window::is_hidden()
{
    return m_is_hidden;
}

// void Window::destroy()
// {
//     this->close();
//     WindowManager::get_instance().remove_window(*this);
// }

// Window::~Window()
// {
//     this->destroy();
// }