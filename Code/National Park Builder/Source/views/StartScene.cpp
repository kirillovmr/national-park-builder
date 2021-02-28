#include "StartScene.h"

#include <Shared.h>

StartScene::StartScene() {
    button.setTitle("Go to GAME SCENE");
    button.setFontScale(1.7);
    button.setPosition({10, 10});
    button.setOnAction([] {
        Shared::instance().startSceneController.onStartBtn();
    });
    this->addWidget(button);
    

    textField.setTitle("Put your text here");
    textField.setFontScale(2);
    textField.setPosition({200, 200});
    this->addWidget(textField);
}