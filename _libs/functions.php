<?php

function parseDoc($path)
{
    $lines = explode("\n", file_get_contents($path));
    $response = [];
    $asIsTypes = [
        'code' => false,
    ];
    foreach ($lines as $num => $line) {
        $asIs = false;
        if (!$asIsTypes['code'] && preg_match('/^```.*?/', $line)) {
            $asIsTypes['code'] = true;
        } elseif ($asIsTypes['code'] && preg_match('/^```.*?/', $line)) {
            $asIsTypes['code'] = false;
            $asIs = true;
        }
        $matchId = 0;
        $replacementLineBlocks = [];
        if(!$asIsTypes['code'] && !$asIs && trim($line) !== '') {
            if(preg_match_all('/!?\[.*?\]\((.*?)\)/', $line, $matches)) {
                foreach ($matches[1] as $matchContent) {
                    $line = str_replace($matchContent, "{{RPL[{$matchId}]}}", $line);
                    $replacementLineBlocks[$matchId] = $matchContent;
                    $matchId++;
                }
            }
            if(preg_match_all('/```.*?```/', $line, $matches)) {
                foreach ($matches[0] as $matchContent) {
                    $line = str_replace($matchContent, "{{RPL[{$matchId}]}}", $line);
                    $replacementLineBlocks[$matchId] = $matchContent;
                    $matchId++;
                }
            }
            if(preg_match_all('/`.*?`/', $line, $matches)) {
                foreach ($matches[0] as $matchContent) {
                    $line = str_replace($matchContent, "{{RPL[{$matchId}]}}", $line);
                    $replacementLineBlocks[$matchId] = $matchContent;
                    $matchId++;
                }
            }
        }

        $response[$num] = [
            'empty_line' => trim($line) === '',
            'as_is' => count(array_filter($asIsTypes, function ($bool) {return $bool;})) > 0 || $asIs,
            'content' => $line,
            'replacement_blocks' => $replacementLineBlocks,
        ];
    }
    return $response;
}

function translateLines($lines, $srcLang, $destLang) {
    $document = "";
    foreach ($lines as $line) {
        if($line['empty_line']) {
            $document .= "\n";
            continue;
        }
        if($line['as_is']) {
            $document .= $line['content'] . "     \n";
            continue;
        }
        $hasNewLineMD = '' ;
        if(preg_match('/.*[ ]{2}$/', $line['content'])) {
            echo "END LINE FOUND \n";
            $hasNewLineMD = '    ';
        }

        $content = str_replace('"', "\\\"", $line['content']);
        $translated = trim(exec("trans -b $srcLang:$destLang \"$content\""));
        if($line['replacement_blocks']) {
            foreach ($line['replacement_blocks'] as $num=>$value) {
                $translated = str_replace("{{RPL[{$num}]}}", $value, $translated);
            }
        }
        $document .= $translated . $hasNewLineMD . "\n";
    }
    $document = str_replace("u003d", "=", $document);
    return $document;
}


function getAllFiles($directory = './')
{
    $result = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory), RecursiveIteratorIterator::SELF_FIRST);
    /** @var $fileInfo SplFileInfo */
    foreach ($iterator as $fileInfo) {

        if ($fileInfo->isFile()) {
            $result[] = $fileInfo->getPathname();
        }
    }
    return $result;
}