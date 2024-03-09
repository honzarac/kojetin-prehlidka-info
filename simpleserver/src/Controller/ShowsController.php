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
                'lastYearPhotos' => listPublicImages('2023')
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
//            new Show(
//                showName: 'Zahájení přehlídky',
//                time: '20:00',
//                date: new DateTime('2024-03-06')
//            ),
            new Show(
                showName: 'Mariáš života',
                groupName: 'DS Kroměříž',
                time: '20:10',
                date: new DateTime('2024-03-06'),
                duration: 65,
                photoFolder: 'marias'
            ),
//            new Show(
//                showName: 'Trojlístek pohádek',
//                groupName: 'Divadýlko Mrak',
//                time: '08:15',
//                date: new DateTime('2024-03-07'),
//                duration: 70,
//                photoFolder: 'trojlistek'
//            ),
//            new Show(
//                showName: 'Trojlístek pohádek',
//                groupName: 'Divadýlko Mrak',
//                time: '10:00',
//                date: new DateTime('2024-03-07'),
//                duration: 60,
//                photoFolder: 'trojlistek'
//            ),
            new Show(
                showName: 'Upokojenkyně',
                groupName: 'Divadelní spolek J. K. Tyl Brodek u Přerova',
                time: '20:00',
                date: new DateTime('2024-03-07'),
                duration: 90,
                photoFolder: 'upokojenkyne'
            ),
            new Show(
                showName: 'S čerty nejsou žerty',
                groupName: 'Metropolitní divadlo Praha',
                time: '11:00',
                date: new DateTime('2024-03-08'),
                duration: 60,
                photoFolder: 'certi'
            ),
            new Show(
                showName: 'Vichřice v domě č. 11',
                groupName: 'Studio SEN Olomouc',
                time: '17:00',
                date: new DateTime('2024-03-08'),
                duration: 60,
                photoFolder: 'vychrice'
            ),
            new Show(
                showName: 'Tři holky jako květ',
                groupName: 'Smotaná hadice Křenovice',
                time: '20:00',
                date: new DateTime('2024-03-08'),
                duration: 110,
                photoFolder: 'kvet'
            ),
            new Show(
                showName: 'Kandidát',
                groupName: 'Divadelní studio Viktorka Holešov',
                time: '11:00',
                date: new DateTime('2024-03-09'),
                duration: 75,
                photoFolder: 'kandidat'
            ),
            new Show(
                showName: 'Marie, dcera Kajetánova',
                groupName: 'Morkovští ochotníci',
                time: '16:00',
                date: new DateTime('2024-03-09'),
                duration: 70,
                photoFolder: 'marie'
            ),
            new Show(
                showName: 'Není co skrývat',
                groupName: 'Divadlo Dostavník Přerov',
                time: '20:00',
                date: new DateTime('2024-03-09'),
                duration: 90,
                photoFolder: 'dostavnik'
            ),
            new Show(
                showName: 'Zařídil ti to Povondra (Válka s mloky)',
                groupName: 'Studio divadla Haná Vyškov',
                time: '10:00',
                date: new DateTime('2024-03-10'),
                duration: 85,
                photoFolder: 'mloci'
            ),
            new Show(
                showName: 'Jeppe',
                groupName: 'Dohráli jsme Uherské Hradiště',
                time: '13:00',
                date: new DateTime('2024-03-10'),
                duration: 80,
                photoFolder: 'jeppe'
            ),
            new Show(
                showName: 'Vyhlášení výsledků Divadelního Kojetína',
                time: '16:30',
                date: new DateTime('2024-03-10'),
                photoFolder: 'vyhlaseni'
            ),
        ];
    }
}