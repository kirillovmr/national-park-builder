#ifndef CONTEXT_H_INCLUDED
#define CONTEXT_H_INCLUDED

#include <memory>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include "../Config.h"

class Context
{
public:
    void create(const Config &config);
    // void make_current();

    auto get_context()
    {
        return m_context;
    }

    int get_id()
    {
        return m_context_id;
    }

private:

private:
    std::shared_ptr<GLFWwindow> m_context;

    int m_context_id;
    bool m_made_current_first_time = true;
};

#endif /* CONTEXT_H_INCLUDED */