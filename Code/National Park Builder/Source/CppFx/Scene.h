#ifndef SCENE_H_INCLUDED
#define SCENE_H_INCLUDED

#include <list>

#include "ComponentsCore/Window.h"
#include "ComponentsCore/Widget.h"
#include "ComponentsCore/Graphics.h"

#include "../Math/glm.h"

class Scene
{
public:
    void addWindow(Window &window);
    void addWidget(Widget &widget);
    void addGraphics(Graphics &graphics);

    void setSize(const iVector2 &size);
    void setPosition(const iVector2 &position);

    iVector2 getSize();
    iVector2 getPosition();

    bool is_size_default();
    bool is_position_default();

    void __render();

private:
    void render_windows();
    void render_widgets();
    void render_graphics();

private:
    // Pointers used in order to use polimorphism
    // They are not pointing to memory allocated with new
    std::list<Window *> m_windows;
    std::list<Widget *> m_widgets;
    Graphics *m_graphics = nullptr;

    iVector2 m_size;
    iVector2 m_position;

    bool m_is_size_default = true;
    bool m_is_position_default = true;
};

#endif /* SCENE_H_INCLUDED */