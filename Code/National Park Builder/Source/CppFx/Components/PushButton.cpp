#include "PushButton.h"

void PushButton::setTitle(const std::string &title)
{
    m_title = title;
}

void PushButton::setup_widget()
{       
    ImGui::SetWindowPos(this->m_position);
    ImGui::SetWindowFontScale(this->m_font_scale);

    ImGui::Button(m_title.c_str(), this->m_size);
    if(ImGui::IsItemClicked())
    {
        m_callback();
    }
}

void PushButton::setOnAction(std::function<void(void)> callback)
{
    m_callback = callback;
}