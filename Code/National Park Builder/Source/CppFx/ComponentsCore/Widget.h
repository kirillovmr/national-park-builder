#ifndef WIDGET_H_INCLUDED
#define WIDGET_H_INCLUDED

#include <imgui/imgui.h>

class Widget
{
public:
    Widget();

    void render();

    virtual void setup_widget() = 0;

    void setSize(const ImVec2 &size);
    void setPosition(const ImVec2 &position);
    void setFontScale(float scale);

    void open();
    void close();

    bool is_open();

    // void destroy();

    virtual ~Widget() {}

protected:
    ImVec2 m_size;
    ImVec2 m_position;
    float m_font_scale = 1.0;

private:
    bool m_is_opened = true;

    int m_id;
};

#endif /* WIDGET_H_INCLUDED */