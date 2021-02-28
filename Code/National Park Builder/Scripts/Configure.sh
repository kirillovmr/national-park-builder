mkdir -p build
cd build

mkdir -p dependencies
mkdir -p debug
mkdir -p release

if [ "$1" = "release" ]
then
    cd release

    if [ "$2" = "verbose" ]
    then
        cmake -DCMAKE_BUILD_TYPE=Release -DDISPLAY_FOUND_LIBRARIES_PATHS=ON ../..
    else
        cmake -DCMAKE_BUILD_TYPE=Release ../..
    fi
else
    cd debug 

    if [ "$2" = "verbose" ]
    then
        cmake -DCMAKE_BUILD_TYPE=Debug -DDISPLAY_FOUND_LIBRARIES_PATHS=ON ../..
    else 
        cmake -DCMAKE_BUILD_TYPE=Debug ../..
    fi
fi

echo "Configuring done"