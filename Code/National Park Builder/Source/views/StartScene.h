#pragma once

#include <CppFx/Scene.h>
#include <CppFx/Components/PushButton.h>
#include <CppFx/Components/TextField.h>

class StartScene: public Scene {
public:
    PushButton button;
    TextField textField;

public:
    StartScene();
};