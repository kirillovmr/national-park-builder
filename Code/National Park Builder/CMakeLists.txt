cmake_minimum_required(VERSION 3.17.3 FATAL_ERROR)

project(NationalParkBUilder LANGUAGES C CXX VERSION 1.0.0)

set(CXX_STANDARD 17)
set(CXX_STANDARD OFF)
set(CXX_STANDARD_REQUIRED ON)

# Adding compiler flags
if( ${CMAKE_CXX_COMPILER_ID} MATCHES AppleClang OR
	${CMAKE_CXX_COMPILER_ID} MATCHES GNU )

	list(APPEND CMAKE_CXX_FLAGS "-std=c++17")
endif()

# Adding source files
file(GLOB_RECURSE SOURCE_FILES 
	${CMAKE_SOURCE_DIR}/Source/*.c
    ${CMAKE_SOURCE_DIR}/Source/*.cpp)

# Adding header files
file(GLOB_RECURSE HEADER_FILES 
	${CMAKE_SOURCE_DIR}/Source/*.h
	${CMAKE_SOURCE_DIR}/Source/*.hpp)

# Adding executable
add_executable(${PROJECT_NAME} ${HEADER_FILES} ${SOURCE_FILES})

target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/Source)

# Can be set with -DDISPLAY_FOUND_LIBRARIES_PATHS=ON while running cmake command
option(DISPLAY_FOUND_LIBRARIES_PATHS "Display all paths to the found libraries" OFF)

# Setting CMAKE_MODULE_PATH variable that is later used by include and find_package
set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake_modules")

# Adding Libraries
# Adding OpenGL
find_package(OpenGL REQUIRED QUIET)

if(${OpenGL_FOUND})
	message(STATUS "OpenGL library loaded successfully")
else()
	message(STATUS "Can not load OpenGL library")
endif()

if(${DISPLAY_FOUND_LIBRARIES_PATHS})
	message(STATUS "OpenGL include: ${OPENGL_INCLUDE_DIR}")
	message(STATUS "OpenGL lib: ${OPENGL_LIBRARIES}")
endif()

target_include_directories(${PROJECT_NAME} PRIVATE ${OPENGL_INCLUDE_DIR})
target_link_libraries(${PROJECT_NAME} PRIVATE ${OPENGL_LIBRARIES})


# Adding GLFW
find_package(glfw3 3.3 REQUIRED QUIET)

# Findglfw3 module does not set any variables such as OPENGL_INCLUDE_DIR | OPENGL_LIBRARIES.
# We can check if it is loaded successfuly by checking glfw3_FOUND variable.
if(${glfw3_FOUND})
	message(STATUS "GLFW library loaded successfully")
else()
	message(STATUS "Can not load GLFW library")
endif()

# Automatically sets include dirs.
target_link_libraries(${PROJECT_NAME} PRIVATE glfw)


# Adding GLM
find_package(GLM REQUIRED QUIET)

if(${GLM_FOUND})
	message(STATUS "GLM library loaded successfully")
else()
	message(STATUS "Can not load GLM library")
endif()

if(${DISPLAY_FOUND_LIBRARIES_PATHS})
	message(STATUS "GLM include: ${GLM_INCLUDE_DIRS}")
endif()

target_include_directories(${PROJECT_NAME} PRIVATE ${GLM_INCLUDE_DIRS})


# Adding glad
unset(UNPACKED_GLAD_FILES CACHE)

# Try to find glad files
find_file(UNPACKED_GLAD_FILES
	NAMES 
		glad.c
		glad.h
		khrplatform.h
	PATHS 
		${CMAKE_SOURCE_DIR}/build/dependencies/glad

	NO_DEFAULT_PATH
)

# If not found then unpack glad.zip
if(UNPACKED_GLAD_FILES MATCHES UNPACKED_GLAD_FILES-NOTFOUND)
	execute_process(
		COMMAND 
			${CMAKE_COMMAND} -E tar -xzf ${CMAKE_SOURCE_DIR}/Lib/glad/glad.zip
		WORKING_DIRECTORY
			${CMAKE_SOURCE_DIR}/build/dependencies
	)
endif()

set(GLAD_DIR ${CMAKE_SOURCE_DIR}/build/dependencies)

# Creating glad library
add_library(glad)

target_sources(glad 
	PUBLIC 
	${GLAD_DIR}/glad/glad.h
	${GLAD_DIR}/glad/khrplatform.h
	PRIVATE
	${GLAD_DIR}/glad/glad.c
)

# Adding glad library to the project
target_include_directories(glad PRIVATE ${GLAD_DIR}/glad)
target_include_directories(${PROJECT_NAME} PRIVATE ${GLAD_DIR})

target_link_libraries(${PROJECT_NAME} PRIVATE glad)

message(STATUS "GLAD library loaded successfully")


# Adding ImGui
unset(UNPACKED_IMGUI_FILES CACHE)

# Try to find ImGui files
find_file(UNPACKED_IMGUI_FILES
	NAMES 
		imconfig.h
		imgui.cpp
		imgui.h
		imgui_demo.cpp
		imgui_draw.cpp
		imgui_internal.h
		imstb_rectpack.h
		imstb_textedit.h
		imstb_truetype.h
		imgui_widgets.cpp
		imgui_impl_glfw.h
		imgui_impl_glfw.cpp
		imgui_impl_opengl3.h
		imgui_impl_opengl3.cpp
		
	PATHS 
		${CMAKE_SOURCE_DIR}/build/dependencies/imgui

	NO_DEFAULT_PATH
)

# If not found then unpack imgui.zip
if(UNPACKED_IMGUI_FILES MATCHES UNPACKED_IMGUI_FILES-NOTFOUND)
	execute_process(
		COMMAND 
			${CMAKE_COMMAND} -E tar -xzf ${CMAKE_SOURCE_DIR}/Lib/imgui/imgui.zip
		WORKING_DIRECTORY
			${CMAKE_SOURCE_DIR}/build/dependencies
	)
endif()

set(IMGUI_DIR ${CMAKE_SOURCE_DIR}/build/dependencies)

# Creating imgui library
add_library(imgui)

target_sources(imgui
	PUBLIC 
	${IMGUI_DIR}/imgui/imconfig.h
	${IMGUI_DIR}/imgui/imgui.h
	${IMGUI_DIR}/imgui/imgui_internal.h
	${IMGUI_DIR}/imgui/imstb_rectpack.h
	${IMGUI_DIR}/imgui/imstb_textedit.h
	${IMGUI_DIR}/imgui/imstb_truetype.h
	${IMGUI_DIR}/imgui/imgui_impl_glfw.h
	${IMGUI_DIR}/imgui/imgui_impl_opengl3.h
	PRIVATE
	${IMGUI_DIR}/imgui/imgui.cpp
	${IMGUI_DIR}/imgui/imgui_demo.cpp
	${IMGUI_DIR}/imgui/imgui_draw.cpp
	${IMGUI_DIR}/imgui/imgui_widgets.cpp
	${IMGUI_DIR}/imgui/imgui_impl_glfw.cpp
	${IMGUI_DIR}/imgui/imgui_impl_opengl3.cpp
)

# Adding imgui library to the project
target_include_directories(imgui PRIVATE ${IMGUI_DIR}/imgui)
target_include_directories(${PROJECT_NAME} PRIVATE ${IMGUI_DIR})

target_link_libraries(${PROJECT_NAME} PRIVATE imgui)

# Link with glfw because ImGui works on top of GLFW in this implementation
target_link_libraries(imgui PRIVATE glfw)
# Add opengl
target_link_libraries(imgui PRIVATE glad)
target_include_directories(imgui PRIVATE ${GLAD_DIR})

# Adding custom gui wrapper writen for imgui called CppFx
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_SOURCE_DIR}/Source)

message(STATUS "IMGUI library loaded successfully")

# Doing wrap up
unset(DISPLAY_FOUND_LIBRARIES_PATHS CACHE)
