#ifndef MY_WINDOW_H_INCLUDED
#define MY_WINDOW_H_INCLUDED

#include "CppFx/ComponentsCore/Window.h"
#include <iostream>

static const size_t buf_size = 256;
static char text[buf_size];

class MyWindow : public Window
{
public:
    virtual void setup_window() override
    {
        setTitle("This is the title");
        setSize(ImVec2(400, 200));
        setPosition(ImVec2(600, 0));
        setFontScale(1);
        set_flags(WindowFlags::NO_MOVABLE | WindowFlags::NO_RESIZABLE);
    }

    virtual void setup_widgets() override
    {
        ImGui::Text("This is a button: ");
        ImGui::SameLine();

        ImGui::InputText("text goes here", text, buf_size);

        std::cout << text << std::endl;

        ImGui::Button("Hello", ImVec2(120, 100));
        if(ImGui::IsItemClicked())
        {
            std::cout << "clicked" << std::endl;
        }

        ImGui::Separator();
        ImGui::Separator();

        ImGui::SliderFloat("Change value of s", &s, 0.0f, 10.0f);

        ImGui::Separator();
        ImGui::Separator();

        ImGui::ColorEdit3("clear color", (float*)&clear_color);

        ImGui::Button("Close");
        if(ImGui::IsItemClicked())
        {
            this->close();
        }
    }

    ImVec4 clear_color = ImVec4(0.45f, 0.55f, 0.60f, 1.00f);
    float s = 1.0;
};

#endif /* MY_WINDOW_H_INCLUDED */