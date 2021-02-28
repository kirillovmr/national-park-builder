#include <iostream>
#include <memory>

#include <Shared.h>
#include <CppFx/Application.h>
#include <views/StartScene.h>
#include <views/GameScene.h>

class MyApp : public Application {
public:
    void init(int argc, char *argv[]) {
        launch(argc, argv);
    }

    void start(Stage &primaryStage) override {
        // Make views global and shared between all files
        Shared::instance().stage = primaryStage;
        Shared::instance().startScene = std::make_shared<StartScene>();
        Shared::instance().gameScene = std::make_shared<GameScene>();

        // Set an initial scene1
        Shared::instance().uiController.setScene(*Shared::instance().gameScene.get());
        Shared::instance().stage.setTitle("National Park Builder");
        Shared::instance().stage.show();
    }
};

int main(int argc, char *argv[]) {
    MyApp myapp;
    myapp.init(argc, argv);
}