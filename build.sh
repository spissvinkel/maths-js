#!/bin/bash

rm -rf ./*.d.ts ./*.js ./*.map ./build/*

./node_modules/.bin/tsc
