if [ "$1" = "release" ]
then
    ./build/release/NationalParkBUilder
    echo "Running in release mode"
else
    ./build/debug/NationalParkBUilder
    echo "Running in debug mode"
fi