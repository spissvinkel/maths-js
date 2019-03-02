#!/bin/bash

rm -rf ./docs/api/* ./docs/api/.nojekyll

./node_modules/.bin/typedoc ./src

touch ./docs/api/.nojekyll
touch ./docs/api/modules/.nojekyll
touch ./docs/api/interfaces/.nojekyll
