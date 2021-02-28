if [ "$1" = "release" ]
then
    cd build/release
    cmake --build .
    echo "Built target in build/release/"

    cd ../..
    ./build/release/NationalParkBUilder
    echo "Running in release mode"
else
    cd build/debug
    cmake --build .
    echo "Built target in build/debug/"

    cd ../..
    ./build/debug/NationalParkBUilder
    echo "Running in debug mode"
fi
