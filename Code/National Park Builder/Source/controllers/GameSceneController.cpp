#include "GameSceneController.h"

#include <iostream>

#include <Shared.h>
#include <views/StartScene.h>
// #include <Components/Bank/Bank.h>

void GameSceneController::onMainMenuBtn() {
    Shared::instance().uiController.setScene(*Shared::instance().startScene.get());
}

void GameSceneController::onGeneralBuildBtn() {
    
}

bool GameSceneController::onBuildBtn(Building &bld) {
    // Check money
    if (bld.price > Shared::instance().bank.getBalance()) {
        std::cout << "❌[GameSceneController::onBuildBtn] Not enough money to build " << bld.name << std::endl;
        return false;
    }

    // OpenGL -> show dummy building with half opacity
    // TODO

    // Save dummy model locally for future confirmation of the build
    this->dummy_building = &bld;

    std::cout << "[GameSceneController::onBuildBtn] Dummy object placed: " << bld.name << std::endl;
    return true;
}

void GameSceneController::onDummyBuildConfirm() {
    // Make sure we have a dummy building model saved
    if (this->dummy_building == nullptr) {
        std::cout << "❌[GameSceneController::onDummyBuildConfirm] No dummy building :(" << std::endl;
        return;
    }

    // Go through bank one more time
    if (this->dummy_building->price > Shared::instance().bank.getBalance()) {
        std::cout << "❌[GameSceneController::onDummyBuildConfirm] Not enough money to build " << this->dummy_building->name << std::endl;
        return;
    }

    // OpenGL -> place game object (dummy obj info at this->dummy_building)
    // TODO

    std::cout << "[GameSceneController::onBuildBtn] Building was created: " << this->dummy_building->name << std::endl;
    this->dummy_building = nullptr;
}

void GameSceneController::onDummyBuildCancel() {
    // OpenGL -> clear dummy object
    // TODO

    std::cout << "[GameSceneController::onBuildBtn] Dummy building was cancelled: " << this->dummy_building->name << std::endl;
    this->dummy_building = nullptr;
}