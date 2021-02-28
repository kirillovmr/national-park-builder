#include "Widget.h"
#include <string>

namespace
{
    int id = 0;
}


Widget::Widget()
{
    m_id = id++;
}

void Widget::render()
{
    if(this->is_open() == false)
        return;

    std::string name = std::to_string(m_id);

    ImGui::Begin(name.c_str(), nullptr, ImGuiWindowFlags_NoBackground | ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize);

    this->setup_widget();
    ImVec2 widget_size = ImGui::GetItemRectSize();
    ImGui::SetWindowSize(ImVec2(widget_size.x + 16, widget_size.y + 16));

    ImGui::End();
}

void Widget::setSize(const ImVec2 &size)
{
    m_size = size;
}

void Widget::setPosition(const ImVec2 &position)
{
    m_position = position;
}

void Widget::setFontScale(float scale)
{
    m_font_scale = scale;
}

void Widget::open()
{
    m_is_opened = true;
}

void Widget::close()
{
    m_is_opened = false;
}

bool Widget::is_open()
{
    return m_is_opened;
}

// void Widget::destroy()
// {
//     this->close();
//     WindowManager::get_instance().remove_widget(*this);
// }

// Widget::~Widget()
// {
//     this->destroy();
// }