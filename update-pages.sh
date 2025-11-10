#!/bin/bash

git checkout pages
rm -f *.yml *.html *.md
rm -rf api
git checkout main -- docs/*
mv -f docs/* .
rm -rf docs
git add --all
git commit -m "update docs"
git push
git checkout main
