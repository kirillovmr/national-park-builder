#ifndef WINDOW_FLAGS_H_INCLUDED
#define WINDOW_FLAGS_H_INCLUDED

#include <imgui/imgui.h>

enum WindowFlags
{
    NO_FLAGS = ImGuiWindowFlags_None,

    NO_MOVABLE = ImGuiWindowFlags_NoMove,
    NO_RESIZABLE = ImGuiWindowFlags_NoResize,
    NO_TILE_BAR = ImGuiWindowFlags_NoTitleBar,

    TRANSPARENT_BACKGROUND = ImGuiWindowFlags_NoBackground | ImGuiWindowFlags_NoTitleBar
};

#endif /* WINDOW_FLAGS_H_INCLUDED */