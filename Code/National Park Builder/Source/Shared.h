#pragma once

#include <memory>
#include <CppFx/Stage.h>

#include <views/GameScene.h>
#include <views/StartScene.h>

#include <controllers/UIcontroller.h>
#include <controllers/StartSceneController.h>
#include <controllers/GameSceneController.h>

#include <Components/Bank/Bank.h>

class Shared {
private:
    Shared() {}
    
public:
    static Shared& instance() {
        static Shared s;
        return s;
    }

// Define shared globals here 👇
public:
    Stage stage;

    std::shared_ptr<GameScene> gameScene;
    std::shared_ptr<StartScene> startScene;

    UIcontroller uiController;
    GameSceneController gameSceneController;
    StartSceneController startSceneController;

    Bank bank;
};