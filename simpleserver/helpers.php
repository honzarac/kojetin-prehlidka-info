<?php

function response(): \Pecee\Http\Response
{
    return \Pecee\SimpleRouter\SimpleRouter::response();
}

function request(): \Pecee\Http\Request
{
    return \Pecee\SimpleRouter\SimpleRouter::request();
}

function listPublicImages(string $folder): array {
    try {
        $recursiveIterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator(
                PHOTO_FOLDER . '/shows/' . $folder,
                \RecursiveDirectoryIterator::SKIP_DOTS
            )
        );
    } catch (Throwable $e) {
        return [];
    }

    /** @var SplFileInfo $file */
    $photos = [];
    foreach ($recursiveIterator as $file ) {
        $photos[] = 'http://localhost:8080/' .
            str_replace('\\', '/', preg_replace('/(.*)\/static/', '/static', $file->getPathname()));
    }
    return $photos;
}