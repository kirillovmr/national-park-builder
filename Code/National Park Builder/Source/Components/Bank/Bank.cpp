#include "Bank.h"

Bank::Bank(int startBal) {
    balance = startBal;
}

Bank::Bank() {
    balance = 1000;
}

int Bank::getBalance() {
    return balance;
}

void Bank::put(int sum) {
    balance += sum;
}

int Bank::substract(int sum) {
    if(balance - sum < 0)
        return -1;
    return (balance -= sum);
}
