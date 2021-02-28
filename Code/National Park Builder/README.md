# Gui Setup Documentation

## Downloading the libraries
To successfully build and run the project the user needs to have:
1) GLFW library installed.
2) GLM library installed (Is needed for the first release, after will be embedded in the project as a .zip file).
3) The project also uses glad and imgui libraries but they are put they were compressed into .zip files and were put to Lib folder inside Code/NationalParkBuilder directory. They are unzipped later at Configure stage (See below).

Since every member of a team has a Mac here is a guide for setup on Mac:

To install glwf:

```
# Open the terminal and run
$ brew install glfw3
```

To install glm:

```
# Open the terminal and run
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
$ brew install glm
```

# CMake
In order to run the scripts below the users need to have a CMake(version 3.17.3) installed on their machine. Here is how CMake can be installed:
https://stackoverflow.com/questions/32185079/installing-cmake-with-home-brew.

## Install, Build and Run
Now you are ready to clone the repository and launch the program.
Here is how you can do it:

``` bash
# Open the terminal and clone the repository
$ cd Code/National\ Park\ Builder
$ bash Scripts/Configure.sh release
$ bash Scripts/Build@Run.sh release
```

Now you must see the green screen with some gui on it!

# Scripts explanation
## bash Scripts/Configure.sh
Makes a makefile for the project and unzips the libraries in Lib folder inside Code/NationalParkBuilder directory. As a result the build folder is created inside Code/NationalParkBuilder. A build folder contains three subfolders:
1) release - Contains the Makefile of the project if used the release build option (i.e. bash Scripts/Configure.sh release). Otherwise the folder is empty.
2) debug - Contains the Makefile of the project if used the debug build option (default, i.e. bash Scripts/Configure.sh). Otherwise the folder is empty.
3) Dependencies - The folder where the files of the unzipped libraries get stored.

## bash Scripts/Build.sh
Builds the Makefile. As a result we get an executable file of the program.

## bash Scripts/Run.sh
Runs the program.


