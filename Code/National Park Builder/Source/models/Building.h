#pragma once

#include <string>
#include <iostream>
#include <memory>
#include <vector>

enum Buildings {
    TEPLITSA, 
    FOUNTAIN, 
    TREE, 
    FASTFOOD,
    END
};

// Base class of ALL the buildings placed on the map
class Building {
public:
    std::string name;
    int price;
    // Отмытая Выручка в день
    int revenue;
    // 1 to 5 || 0.1 to 10% respectively
    int excitement_lvl;

    // Returns a vector of all building models
    static std::shared_ptr<std::vector<std::shared_ptr<Building>>> getBuildings() {
        std::shared_ptr<std::vector<std::shared_ptr<Building>>> buildings = std::make_shared<std::vector<std::shared_ptr<Building>>>();
        for(int i = 0; i < Buildings::END; i++)
            buildings->push_back(Building::getBuilding(i));

        return buildings;
    }

    static std::shared_ptr<Building> getBuilding(int b) {
        switch (b) {
        case Buildings::TEPLITSA:
            return std::make_shared<Building>("TEPLITSA", 100, 0, 1);
        case Buildings::FOUNTAIN:
            return std::make_shared<Building>("FOUNTAIN", 250, 0, 2);
        case Buildings::TREE:
            return std::make_shared<Building>("TREE", 25, 0, 1);
        case Buildings::FASTFOOD:
            return std::make_shared<Building>("FASTFOOD", 200, 100, 0);
        default:
            return std::make_shared<Building>("JIRA", -1, -1, -1);
        }
    }

    Building(std::string name, int price, int revenue, int excitement_lvl): 
        name(name), price(price), revenue(revenue), excitement_lvl(excitement_lvl) {
        // std::cout << "New building created: " << name << std::endl;
    }
};

// Теплица
// Фонтан
// Дерево
// Фастфуд