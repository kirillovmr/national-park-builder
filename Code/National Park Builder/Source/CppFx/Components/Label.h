#ifndef LABEL_H_INCLUDED
#define LABEL_H_INCLUDED

#include <string>
#include "../ComponentsCore/Widget.h"

class Label : public Widget
{
public:
    void setText(const std::string &text);
    virtual void setup_widget() override;

private:
    std::string m_text = "default";
};

#endif /* LABEL_H_INCLUDED */