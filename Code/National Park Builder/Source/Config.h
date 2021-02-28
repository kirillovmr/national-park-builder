#ifndef CONFIG_H_INCLUDED
#define CONFIG_H_INCLUDED

#include <string>

struct Config
{   
    std::string title = "Default Title";

    bool is_full_screen = false;
    int window_width = 1280;
    int window_height = 720;

    int opengl_version_major = 4;
    int opengl_version_minor = 1;
}; 

#endif /* CONFIG_H_INCLUDED */