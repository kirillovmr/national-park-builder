#include "Context.h"

#include <imgui/imgui.h>
#include <imgui/imgui_impl_glfw.h>
#include <imgui/imgui_impl_opengl3.h>

namespace /* Callbacks */
{
    void framebuffer_size_callback(GLFWwindow* window, int width, int height)
    {
        glViewport(0, 0, width, height);
    }
}

void Context::create(const Config &config)
{   
    // Init glfw
    if(glfwInit() == GL_FALSE)
        throw std::runtime_error("Error during glfw initialization\n");

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, config.opengl_version_major);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, config.opengl_version_minor);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    
#ifdef __APPLE__
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
#endif

    // window means the same as context
    m_context = std::shared_ptr<GLFWwindow>
    (
        glfwCreateWindow(config.window_width, config.window_height, config.title.c_str(), nullptr, nullptr),
        [](GLFWwindow *w) { glfwDestroyWindow(w); }
    );

    if (m_context == nullptr)
    {
        glfwTerminate();
        throw std::runtime_error("Can not create a context\n");
    }
    
    glfwMakeContextCurrent(m_context.get());
    glfwSetFramebufferSizeCallback(m_context.get(), framebuffer_size_callback);

    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        glfwTerminate();
        throw std::runtime_error("Failed to initialize GLAD\n");
    }

    // Init imgui
    ImGui::CreateContext();
    ImGui_ImplGlfw_InitForOpenGL(m_context.get(), true);
    const char* glsl_version = "#version 410";
    ImGui_ImplOpenGL3_Init(glsl_version);
    ImGui::StyleColorsDark();

}
