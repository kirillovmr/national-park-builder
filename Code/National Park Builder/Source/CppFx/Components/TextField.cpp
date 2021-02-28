#include "TextField.h"
#include <iostream>

TextField::TextField()
{
    m_text[0] = 0;
}

void TextField::setText(const std::string &text)
{
    for(int i = 0; i < text.size(); i++)
    {
        if(i >= MAX_INPUT_SIZE)
            return;

        m_text[i] = text[i];
    }
}

void TextField::setTitle(const std::string &title)
{
    m_title = title;
}

std::string TextField::getText()
{
    return std::string(m_text);
}

void TextField::setup_widget()
{
    ImGui::SetWindowPos(this->m_position);
    ImGui::SetWindowFontScale(this->m_font_scale);

    ImGui::InputText(m_title.c_str(), m_text, MAX_INPUT_SIZE);
}