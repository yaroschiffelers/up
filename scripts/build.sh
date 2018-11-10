#!/bin/bash
# Build the production version of Up.
# @author Yaro Schiffelers - 2018
# @license MIT

# Clean the dist folder
rm -rf dist/*

# Create the lib folder
mkdir dist/lib

# Copy the source files
cp index.js dist/
cp up.config.js dist/
cp -a lib/. dist/lib/

# Run Babel
NODE_ENV=production babel --verbose dist/index.js dist/lib/
echo "\n Done"
