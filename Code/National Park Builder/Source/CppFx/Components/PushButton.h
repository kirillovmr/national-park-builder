#ifndef PUSH_BUTTON_H_INCLUDED
#define PUSH_BUTTON_H_INCLUDED

#include <string>
#include <functional>
#include "../ComponentsCore/Widget.h"

class PushButton : public Widget
{
public:
    void setTitle(const std::string &title);
    virtual void setup_widget() override;

    void setOnAction(std::function<void(void)> callback);

private:
    std::string m_title = "default";
    std::function<void(void)> m_callback;
};

#endif /* PUSH_BUTTON_H_INCLUDED */