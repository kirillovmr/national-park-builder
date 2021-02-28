#include "GameScene.h"

// #include <

#include <Shared.h>
#include <models/Building.h>
#include <controllers/GameSceneController.h>

#include <iostream>

using std::cout;
using std::endl;

GameScene::GameScene() {
    // initialize buildings btns
    float currX = 650, btn_width = 120, currY = 675;
    auto blds = Building::getBuildings();
    for (int i=0; i<blds->size(); i++) {
        auto building_ptr = blds->at(i);
        auto btn = std::make_shared<PushButton>();
        btn->setTitle(building_ptr->name);
        btn->setFontScale(1.7);
        btn->setPosition({currX, currY});
        btn->setOnAction([building_ptr]{
            if (Shared::instance().gameSceneController.onBuildBtn(*building_ptr)) {
                // Dummy object was placed. Display confirm and cancel buttons now.

            }

        });
        btn->close();
        buildingsBtns.push_back(btn);
        this->addWidget(*btn.get());

        currX += btn_width;
    }

    // Menu Btn
    toMenuBtn.setTitle("Menu");
    toMenuBtn.setFontScale(1.7);
    toMenuBtn.setPosition({0, 0});
    toMenuBtn.setOnAction([this] { 
        Shared::instance().gameSceneController.onMainMenuBtn();
    });
    this->addWidget(toMenuBtn);

    // Dummy Btn
    dummyBtn.setTitle("Dummy");
    dummyBtn.setPosition({1150,0});
    dummyBtn.setFontScale(1.7);
    dummyBtn.setOnAction([] {
        // Building b = 
        // Shared::instance().gameSceneController.onBuildBtn()
    });
    this->addWidget(dummyBtn);

    // Build Btn
    buildBtn.setTitle("Build");
    buildBtn.setPosition({1150,675});
    buildBtn.setFontScale(1.7);
    buildBtn.setOnAction([this] {
        for(auto b : buildingsBtns) {
            b->is_open() ? b->close() : b->open();
        }
    });
    this->addWidget(buildBtn);


    // label.setText("This is a label");
    // label.setFontScale(1.2);
    // label.setPosition({0, 0});
    // this->addWidget(label);
}