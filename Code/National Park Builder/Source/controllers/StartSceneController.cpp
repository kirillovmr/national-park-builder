#include "StartSceneController.h"

#include <iostream>

#include <Shared.h>
#include <views/StartScene.h>
#include <views/GameScene.h>

void StartSceneController::onStartBtn() {
    Shared::instance().uiController.setScene(*Shared::instance().gameScene.get());
    std::cout << Shared::instance().startScene->textField.getText() << std::endl;
}

void StartSceneController::onExitBtn() {

}