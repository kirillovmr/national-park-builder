#include "UIcontroller.h"

#include <Shared.h>

void UIcontroller::setScene(Scene& scene) {
    Shared::instance().stage.setScene(scene);
}