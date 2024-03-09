<?php

require './vendor/autoload.php';
require './helpers.php';

use Pecee\SimpleRouter\SimpleRouter;
use \KjPrehlidka\Controller\ShowsController;

\Spatie\Ignition\Ignition::make()->register();

define('PHOTO_FOLDER', __DIR__ . '/static');

SimpleRouter::get('/status', function() {
    return response()->json(['status' => 'ok']);
});

SimpleRouter::get('/shows', [ShowsController::class, 'render']);
SimpleRouter::start();