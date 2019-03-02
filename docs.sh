#!/bin/bash

rm -rf ./docs/api/* ./docs/api/.nojekyll

./node_modules/.bin/typedoc ./src

touch ./docs/api/.nojekyll
