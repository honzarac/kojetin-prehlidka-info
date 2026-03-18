<?php

namespace KjPrehlidka\Controller;

use DateTimeImmutable as DateTime;
use KjPrehlidka\Model\Show;
use Pecee\Http\Response;

class ShowsController
{
    public static function render(): void
    {
        response()
            ->header('Access-Control-Allow-Origin: *')
            ->json([
                'shows' => array_map(fn (Show $show) => $show->serialize(), self::shows()),
                'shows' => array_map(fn (Show $show) => $show->serialize(), self::futureShows()),
                'lastYearPhotos' => listPublicImages('2025')
            ]);
    }

    private static function futureShows(): array
    {
        return array_values(array_filter(
            self::shows(),
            fn (Show $show) => $show->isFuture()
        ));
    }

    private static function shows(): array
    {
        return [
            new Show(
                showName: 'Tchýně na zabití',
                groupName: 'Hanácká scéna Kojetín',
                time: '20:00',
                date: new DateTime('2026-03-18'),
                duration: 105,
                photoFolder: 'tchyne'
            ),
            new Show(
                showName: 'Anděl Strážný',
                groupName: 'Divadelní studio Viktorka',
                time: '17:00',
                date: new DateTime('2026-03-19'),
                duration: 50,
                photoFolder: 'andel'
            ),
            new Show(
                showName: 'Matka Ubu',
                groupName: 'DS Čapek Uherské Hradiště',
                time: '20:00',
                date: new DateTime('2026-03-19'),
                duration: 60,
                photoFolder: 'ubu'
            ),
            new Show(
                showName: 'Ferda mravenec v cizích službách',
                groupName: 'Divadlo SemTamFór',
                time: '08:15 a 10:00',
                date: new DateTime('2026-03-20'),
                duration: 50,
                photoFolder: 'ferda'
            ),
            new Show(
                showName: 'Muzeum',
                groupName: 'DS ASpol SVČ Lužánky Brno',
                time: '17:00',
                date: new DateTime('2026-03-20'),
                duration: 90,
                photoFolder: 'muzeum'
            ),
            new Show(
                showName: 'Tři na lavičce',
                groupName: 'Divadlo Václav',
                time: '20:00',
                date: new DateTime('2026-03-20'),
                duration: 75,
                photoFolder: 'lavicka'
            ),
            new Show(
                showName: 'Čertovská košařina',
                groupName: 'Morkovští ochotníci',
                time: '11:00',
                date: new DateTime('2026-03-21'),
                duration: 70,
                photoFolder: 'cert'
            ),
            new Show(
                showName: 'Osm žen',
                groupName: 'Kroužek divadelních ochotníků ve Hvozdné',
                time: '15:00',
                date: new DateTime('2026-03-21'),
                duration: 95,
                photoFolder: 'osmzen'
            ),
            new Show(
                showName: 'Půldruhé hodiny zpoždění',
                groupName: 'Divadlo Brod',
                time: '20:00',
                date: new DateTime('2026-03-21'),
                duration: 90,
                photoFolder: 'zpozdeni'
            ),
            new Show(
                showName: 'Tarantella – smím prosit?',
                groupName: 'Nikdy se nepouštěj do řeči s neznámými lidmi Ostrava',
                time: '11:00',
                date: new DateTime('2026-03-22'),
                duration: 50,
                photoFolder: 'tarantella'
            ),
            new Show(
                showName: 'Jen tak',
                groupName: 'Malá scéna ZUŠ Zlín',
                time: '14:00',
                date: new DateTime('2026-03-22'),
                duration: 65,
                photoFolder: 'jentak'
            ),
        ];
    }
}