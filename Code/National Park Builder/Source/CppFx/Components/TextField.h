#ifndef TEXT_FIELD_H_INCLUDED
#define TEXT_FIELD_H_INCLUDED

#include <memory>
#include <string>
#include "../ComponentsCore/Widget.h"

#define MAX_INPUT_SIZE 2048

class TextField : public Widget
{
public:
    TextField();

    void setText(const std::string &text);
    std::string getText();

    void setTitle(const std::string &title);

    virtual void setup_widget() override;

private:
    char m_text[MAX_INPUT_SIZE]; // Max size is MAX_INPUT_SIZE
    std::string m_title = "default";
};

#endif /* TEXT_FIELD_H_INCLUDED */