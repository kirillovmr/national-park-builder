#include "Application.h"

#include "../Config.h"
#include "../Context/Context.h"

#include "Stage.h"

void Application::launch(int argc, char *argv[])
{
    Context context;
    context.create({Config()});

    Stage stage;
    stage.__setContext(context);

    start(stage);
}