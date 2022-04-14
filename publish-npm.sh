#!/bin/bash

./build.sh

cp -r ./build/* .

rm -f ./*.tsbuildinfo

npm publish --access public --otp=$1

rm -f ./*.d.ts ./*.js ./*.map
