if [ "$1" = "release" ]
then
    cd build/release
    cmake --build .
    echo "Built target in build/release/"
else
    cd build/debug
    cmake --build .
    echo "Built target in build/debug/"
fi