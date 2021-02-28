#pragma once

#include <models/Building.h>

class GameSceneController {
public:
    Building *dummy_building = nullptr;

public:
    // Exit from the game scene to the main menu
    void onMainMenuBtn();

    // To be called once user presses the build button
    void onGeneralBuildBtn();

    // To be called on a particular building button
    // Returns true or false depending on whether dummy object was placed on the map or not
    bool onBuildBtn(Building &bld);

    // To be called once dummy object is ready to be placed
    void onDummyBuildConfirm();

    // To be called once dummy object is discarded
    void onDummyBuildCancel();
    
};