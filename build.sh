#!/bin/bash

rm -rf ./*.d.ts ./*.js ./*.map ./lib/* ./build/*

./node_modules/.bin/tsc

cp -r ./build/* .
