#!/bin/bash

rm -rf ./*.d.ts ./*.js ./*.map ./lib/* ./build/*

tsc

cp -r ./build/* .
