#!/usr/bin/env php
<?php
if(count($argv) < 2) {
    die("Source file must be setted in arguments\n");
}
$filePath = $argv[1];
foreach ([
             'en',
             'uk',
         ] as $lang) {
    echo "Try translate $filePath to lang {$lang}\n";
    exec("cp ru/docs/assets/* $lang/docs/assets/");
    exec("cat ru/docs/$filePath | translate -s ru -t $lang > $lang/docs/$filePath");
}
