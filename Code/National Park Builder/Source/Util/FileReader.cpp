//
//  FileReader.cpp
//  Minecraft
//
//  Created by Volodymyr Vakhniuk on 11/30/19.
//  Copyright © 2019 Volodymyr Vakhniuk. All rights reserved.
//

#include "FileReader.h"

#include <fstream>
#include <sstream>
#include <stdexcept>

std::string getFileContents(const std::string& filePath)
{
    std::ifstream inFile(filePath);
    if(!inFile.is_open())
    {
        throw std::runtime_error("Unable to open file: " + filePath);
    }
    
    std::stringstream stream;
    
    stream << inFile.rdbuf();
    return stream.str();
}
