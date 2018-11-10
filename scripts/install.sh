#!/bin/bash
# Setup for complete installation of Up
# @author Yaro Schiffelers - 2018
# @license MIT

# Latest Up compatible Node version.
NODE_TESTED="v11.0.0"

# Utility functions.
function command_exists () { type "$1" &> /dev/null ;}

# Check if we need to install or upgrade Node.js.
# Borrowed from MagicMirror
echo -e "\e[96mCheck current Node installation ...\e[0m"
NODE_INSTALL=false
if command_exists node; then
    echo -e "\e[0mNode currently installed. Checking version number.";
    NODE_CURRENT=$(node -v)
    echo -e "\e[0mMinimum Node version: \e[1m$NODE_TESTED\e[0m"
    echo -e "\e[0mInstalled Node version: \e[1m$NODE_CURRENT\e[0m"
    if version_gt $NODE_TESTED $NODE_CURRENT; then
        echo -e "\e[96mNode should be upgraded.\e[0m"
        NODE_INSTALL=true

        # Check if a node process is currenlty running.
        # If so abort installation.
        if pgrep "node" > /dev/null; then
            echo -e "\e[91mA Node process is currently running. Can't upgrade."
            echo "Please quit all Node processes and restart the installer."
            exit;
        fi

    else
        echo -e "\e[92mNo Node.js upgrade nessecery.\e[0m"
    fi

else
    echo -e "\e[93mNode.js is not installed.\e[0m";
    NODE_INSTALL=true
fi

# Install or upgrade node if necessary.
if $NODE_INSTALL; then

    echo -e "\e[96mInstalling Node.js ...\e[90m"

    # Fetch the latest version of Node.js from the selected branch
    # The NODE_STABLE_BRANCH variable will need to be manually adjusted when a new branch is released. (e.g. 7.x)
    # Only tested (stable) versions are recommended as newer versions could break MagicMirror.

    NODE_STABLE_BRANCH="11.x"
    curl -sL https://deb.nodesource.com/setup_$NODE_STABLE_BRANCH | sudo -E bash -
    sudo apt-get install -y nodejs
    echo -e "\e[92mNode.js installation Done!\e[0m"
fi

# Install Up

# Install Module dependencies

# Copy the sample config
cp up.config.js.sample up.config.js

