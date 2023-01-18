#!/usr/bin/env php
<?php

require __DIR__ . '/_libs/functions.php';

// npm install -g google-translate-cli
if (count($argv) < 3) {
    die("Source and target languages must be setted in arguments\n");
}
$source = $argv[1];
$target = $argv[2];
exec("cd $source && find ./ -type d > ../_dirs.txt");
exec("mkdir -p $target && cd $target && xargs mkdir -p < ../_dirs.txt");
exec("cp $source/docs/assets/* $target/docs/assets/");

foreach (getAllFiles($source) as $path) {
    if (!preg_match('/^.*\.(md)$/', $path)) {
        continue;
    }
    $dstPath = preg_replace("/^(.*?)\/(.*)$/", "$target/\$2", $path);
    echo "Process $path -> $dstPath \n";
    echo "Parse $path\n";
    $parsedLines = parseDoc($path);
    echo "Parse finished. Found lines - " . count($parsedLines) . "\n";
    echo "Translate...\n";
    $document = translateLines($parsedLines, $source, $target);
    echo "Translate finished...\n";

    file_put_contents($dstPath, $document);
}
