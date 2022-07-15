#!/usr/bin/env bash
rm -Rf ./dist
mkdir ./dist
cp ./index.html ./dist
mkdocs build -f ./ru/mkdocs.yml -d ./../dist/ru
mkdocs build -f ./ua/mkdocs.yml -d ./../dist/ua
