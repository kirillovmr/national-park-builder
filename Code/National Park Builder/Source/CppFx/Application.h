#ifndef APPLICATION_H_INCLUDED
#define APPLICATION_H_INCLUDED

#include "Stage.h"

class Application
{
public:
    void launch(int argc, char *argv[]);

    virtual void start(Stage &stage) = 0;    
};


#endif /* APPLICATION_H_INCLUDED */