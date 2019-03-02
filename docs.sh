#!/bin/bash

rm -rf ./docs/*.html ./docs/api/*

./node_modules/.bin/showdown makehtml -i ./docs/index.md -o ./docs/index.html
./node_modules/.bin/typedoc ./src

touch ./docs/.nojekyll
