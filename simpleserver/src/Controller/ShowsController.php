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
//                'shows' => array_map(fn (Show $show) => $show->serialize(), self::futureShows()),
                'lastYearPhotos' => listPublicImages('2024')
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
                showName: 'Vodník Česílko', // 14
                groupName: 'Divadlo Scéna Zlín',
                time: '08:15 a 10:00',
                date: new DateTime('2025-03-13'),
                duration: 60,
                photoFolder: 'cesilko'
            ),
            new Show(
                showName: 'Převýborná historie o benátském kupci aneb Kabaret karneval věkem zaprášený, leč na výsost aktuální', // 99
                groupName: 'Ořechovské divadlo',
                time: '20:00',
                date: new DateTime('2025-03-12'),
                duration: 90,
                photoFolder: 'orechov'
            ),
            new Show(
                showName: 'Pověsti pro štěstí', // 18
                groupName: 'Divadlo SemTamFór',
                time: '08:15',
                date: new DateTime('2025-03-13'),
                photoFolder: 'povesti'
            ),
            new Show(
                showName: 'Sbohem, zůstávám!', // 17
                groupName: 'DS Osvětové besedy Velká Bystřice',
                time: '20:00',
                date: new DateTime('2025-03-13'),
                duration: 115,
                photoFolder: 'sbohem'
            ),
            new Show(
                showName: 'Strašidlo Cantervillské', // 23
                groupName: 'Malá scéna ZUŠ Zlín',
                time: '10:00',
                date: new DateTime('2025-03-14'),
                duration: 70,
                photoFolder: 'strasidlo'
            ),
            new Show(
                showName: 'Co s námi teď bude?', // 19
                groupName: 'Spurníkův ochotnický soubor Sokola Litovel',
                time: '16:00',
                date: new DateTime('2025-03-14'),
                duration: 117,
                photoFolder: 'litovel'
            ),
            new Show(
                showName: 'Ve státním zájmu', // 16
                groupName: 'K.V.A.S. Karviná',
                time: '20:00',
                date: new DateTime('2025-03-14'),
                duration: 125,
                photoFolder: 'statni_zajem'
            ),
            new Show(
                showName: 'Velký vandr aneb Podivuhodní skutkové hanáckého zámečníka na zlatém severu', // 74
                groupName: 'Divadlo Václav Václavov',
                time: '10:00',
                date: new DateTime('2025-03-15'),
                duration: 120,
                photoFolder: 'vandr'
            ),
            new Show(
                showName: 'Olga – Femini skeč o manželce Karla Čapka', // 41
                groupName: 'Divadelní spolek Dialog Brno',
                time: '14:00',
                date: new DateTime('2025-03-15'),
                duration: 60,
                photoFolder: 'dialog'
            ),
            new Show(
                showName: 'Zaklínač', // 8
                groupName: 'Volné divadlo Zlín',
                time: '17:00',
                date: new DateTime('2025-03-15'),
                duration: 50,
                photoFolder: 'zaklinac'
            ),
            new Show(
                showName: 'Česká maminka', // 13
                groupName: 'Divadelní soubor Karla Högera Strání',
                time: '20:00',
                date: new DateTime('2025-03-15'),
                duration: 125,
                photoFolder: 'strani'
            ),
            new Show(
                showName: 'Houbová polévka Naděždy Konstantinovny Krupské', // 46
                groupName: 'Stará aréna Ostrava',
                time: '11:00',
                date: new DateTime('2025-03-16'),
                duration: 90,
                photoFolder: 'houbova_polevka'
            ),
        ];
    }
}