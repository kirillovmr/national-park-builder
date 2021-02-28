#pragma once

class Bank {
private:
    int balance;
public:
    Bank();
    Bank(int b);
    int getBalance();
    int substract(int sum);
    void put(int sum);
};