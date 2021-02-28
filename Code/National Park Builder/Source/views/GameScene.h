#pragma once

#include <CppFx/Scene.h>
#include <CppFx/Components/PushButton.h>
#include <CppFx/Components/Label.h>
#include <vector>
#include <memory>

class GameScene: public Scene {
    // menu // dummy // build
public:
    PushButton toMenuBtn, dummyBtn, buildBtn;
    std::vector<std::shared_ptr<PushButton>> buildingsBtns;
    Label label;

public:
    GameScene();
};