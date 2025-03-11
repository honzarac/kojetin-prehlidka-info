<?php

$imagesUrl = [
    "https://img41.rajce.idnes.cz/d4102/18/18958/18958179_60565aad060bd358ca682dd3a355bec8/images/1483dd.jpg",
];

$showName = '2024';

$showsFolder = __DIR__ . "/static/shows";
$targetFolder = $showsFolder . "/" . $showName;
if (!is_dir($targetFolder)) {
    mkdir($targetFolder);
}

foreach ($imagesUrl as $i => $image) {
    echo "downloading " . $image . "\n";
    if (!file_put_contents($targetFolder . "/". $showName . $i . '.jpg', file_get_contents($image))) {
       echo "Nepodařilo se uložit obrázek 👋 bye";
       exit;
    }
}
