#ifndef STAGE_H_INCLUDED
#define STAGE_H_INCLUDED

#include <string>

#include "Scene.h"
#include "../Context/Context.h"

#include "../Math/glm.h"

class Stage
{
public:
    void setScene(Scene &scene);
    void show();

    void setTitle(const std::string &title = "Default title");
    void __setContext(Context context);

private:
    void setSize(const iVector2 &size);
    void setPosition(const iVector2 &position);

private:
    Scene *m_scene = nullptr;
    Context m_context;
};

#endif /* STAGE_H_INCLUDED */