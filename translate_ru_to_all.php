#!/usr/bin/env php
<?php
require __DIR__ . '/_libs/functions.php';
if(count($argv) < 2) {
    die("Source file must be setted in arguments\n");
}
$filePath = $argv[1];
foreach ([
             'en',
             'uk',
         ] as $lang) {
    echo "Try translate $filePath to lang {$lang}\n";
    $parsedLines = parseDoc('ru/docs/' . $filePath);
    echo "Parse finished. Found lines - " . count($parsedLines) . "\n";
    echo "Translate...\n";
    $document = translateLines($parsedLines, 'ru', $lang);
    echo "Translate finished...\n";
    file_put_contents("$lang/docs/$filePath", $document);
    exec("cp ru/docs/assets/* $lang/docs/assets/");
}
