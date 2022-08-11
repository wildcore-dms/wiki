#!/usr/bin/env bash
rm -Rf ./dist
mkdir ./dist
cp ./index.html ./dist
mkdocs build -f ./ru/mkdocs.yml -d ./../dist/ru
mkdocs build -f ./uk/mkdocs.yml -d ./../dist/uk
mkdocs build -f ./en/mkdocs.yml -d ./../dist/en
