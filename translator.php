#!/usr/bin/env php
<?php
// npm install -g google-translate-cli
if(count($argv) < 3) {
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
    $dstPath = preg_replace("/^(.*?)\/(.*)$/", "$target/\$2", $path );
    echo "Process $path -> $dstPath \n";
    exec("cat $path | translate -s $source -t $target > $dstPath");
}


function getAllFiles($directory = './')
{
    $result = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory), RecursiveIteratorIterator::SELF_FIRST );
    /** @var $fileInfo SplFileInfo */
    foreach ($iterator as $fileInfo ) {

        if ($fileInfo->isFile()) {
            $result[] = $fileInfo->getPathname();
        }
    }
    return $result;
}