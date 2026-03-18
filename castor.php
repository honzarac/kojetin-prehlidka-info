<?php

use Castor\Attribute\AsTask;
use function Castor\io;
use function Castor\run;
use function Castor\fs;

#[AsTask(description: 'Kompletní build')]
function build(): void
{
    io()->title('Startuji moderní build proces...');

    // 1. Vyčištění a příprava
    fs()->remove(['dist']);
    fs()->mkdir('dist');

    // 2. Frontend build
    io()->section('Stavím Vue frontend...');
    run('yarn build');

    // 3. Kopírování souborů
    io()->section('Skládám aplikaci...');
    fs()->mirror('simpleserver', 'dist/www');

    // 4. Stažení a brutální ořezání PHP (Windows x64)
    prepare_php('dist/php');

    // 5. Optimalizace obrázků (WebP)
    optimize_images('dist/www/static');

    // 6. Generování spouštěče a finální EXE
    fs()->copy('ops/scripts/spustit.bat', 'dist/spustit.bat');

    io()->success('Build hotov! Finální EXE najdeš v rootu.');
}

function prepare_php(string $targetPath): void
{
    $url = "https://windows.php.net/downloads/releases/php-8.4.16-nts-Win32-vs17-x64.zip";
    $zipPath = 'cache/php_win.zip';

    if (!fs()->exists('cache')) fs()->mkdir('cache');
    if (!fs()->exists($zipPath)) {
        io()->listing(['Stahuji PHP 8.4 pro Windows...']);
        run("curl -L $url -o $zipPath");
    }

    run("unzip -q $zipPath -d $targetPath");

    // Dieta pro PHP: Necháme jen to nejnutnější pro tvůj server
    $keep = ['php.exe', 'php8.dll', 'php_mbstring.dll', 'php_openssl.dll', 'icu*.dll'];
    $files = scandir($targetPath);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $shouldKeep = false;
        foreach ($keep as $pattern) {
            if (fnmatch($pattern, $file)) { $shouldKeep = true; break; }
        }
        if (!$shouldKeep) {
            $path = "$targetPath/$file";
            is_dir($path) ? fs()->remove($path) : unlink($path);
        }
    }
}

function optimize_images(string $path): void
{
    io()->section("Optimalizuji obrázky přes ImageMagick...");

    $directory = new \RecursiveDirectoryIterator($path);
    $iterator = new \RecursiveIteratorIterator($directory);
    $regex = new \RegexIterator($iterator, '/^.+\.(jpe?g)$/i', \RecursiveRegexIterator::GET_MATCH);

    foreach ($regex as $file) {
        $oldPath = $file[0];
        $info = pathinfo($oldPath);

        $cleanName = sanitize_filename($info['filename']);
        $newPath = $info['dirname'] . '/' . $cleanName . '.jpg';
        $webpPath = $info['dirname'] . '/' . $cleanName . '.webp';

        if ($oldPath !== $newPath) {
            rename($oldPath, $newPath);
        }

        io()->write("Zpracovávám: {$cleanName} ");

        // ImageMagick: magick [vstup] -quality [0-100] [výstup]
        // -strip odstraní EXIF data (ušetří další místo)
        run("magick \"$newPath\" -quality 75 -strip \"$webpPath\"");

        if (file_exists($webpPath)) {
            unlink($newPath);
            io()->write("<fg=green>✓</> ");
        } else {
            io()->write("<fg=red>Chyba!</> ");
        }
    }
    io()->newline();
}

function sanitize_filename(string $filename): string
{
    // Odstranění diakritiky
    $filename = transliterator_transliterate('Any-Latin; Latin-ASCII', $filename);

    // Vše na malá písmena
    $filename = strtolower($filename);

    // Nahradit cokoli kromě a-z a 0-9 pomlčkou
    $filename = preg_replace('/[^a-z0-9]+/', '-', $filename);

    // Odstranit pomlčky na začátku a na konci
    return trim($filename, '-');
}