#ifndef WINDOW_H_INCLUDED
#define WINDOW_H_INCLUDED

#include <string>
#include <imgui/imgui.h>

#include "WindowFlags.h"

class Window
{
public:
    typedef ImGuiWindowFlags WindowFlagsType;

    // Window();

    void render();

    virtual void setup_window() = 0;
    virtual void setup_widgets() = 0;

    void setSize(const ImVec2 &size);
    void setPosition(const ImVec2 &pos);

    void set_flags(WindowFlagsType flags);
    void setTitle(const std::string &title);
    void setFontScale(float scale);

    void open();
    void close();

    void hide();
    void show();

    bool is_open();
    bool is_hidden();

    // void destroy();

    virtual ~Window() {}

private:
    std::string m_title = "default title";
    WindowFlagsType m_flags = WindowFlags::NO_FLAGS;

    bool m_is_open = true;
    bool m_is_hidden = false;
};

#endif /* WINDOW_H_INCLUDED */