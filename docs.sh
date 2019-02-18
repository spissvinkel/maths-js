#!/bin/bash

rm -rf ./docs/api/*

./node_modules/.bin/typedoc ./src/lib

cp ./README.md ./docs
