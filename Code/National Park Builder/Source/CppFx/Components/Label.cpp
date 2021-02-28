#include "Label.h"

void Label::setText(const std::string &text)
{
    m_text = text;
}

void Label::setup_widget()
{
    ImGui::SetWindowPos(m_position);
    ImGui::SetWindowFontScale(m_font_scale);

    ImGui::Text(m_text.c_str());
}
