"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const luxon_1 = require("luxon");
let ShowService = class ShowService {
    async getShows(date) {
        let shows = this.getMongoClient()
            .collection('shows')
            .find({
            date: {
                $gte: date,
            },
        });
        let newShows = await shows.toArray();
        return newShows;
    }
    import() {
        this.getMongoClient()
            .collection('shows')
            .deleteMany({});
        this.getMongoClient()
            .collection('shows')
            .insertMany([
            {
                showName: 'Kosí bratři',
                groupName: 'Scéna Zlín',
                time: '8:15',
                date: luxon_1.DateTime.local(2023, 3, 8),
                length: 90,
                photoFolder: 'kosibratri',
            },
            {
                showName: 'Kosí bratři',
                groupName: 'Scéna Zlín',
                time: '10:15',
                date: luxon_1.DateTime.local(2023, 3, 8),
                length: 90,
                photoFolder: 'kosibratri',
            },
            {
                showName: 'Zahájení přehlídky',
                groupName: '',
                time: '20:00',
                date: luxon_1.DateTime.local(2023, 3, 8),
                length: null,
            },
            {
                showName: 'Haná se nesódí',
                groupName: 'Mimoni Kojetín',
                time: '20:00',
                date: luxon_1.DateTime.local(2023, 3, 8),
                length: 70,
                photoFolder: 'hana',
            },
            {
                showName: 'Vinnetou',
                groupName: 'Scéna Zlín',
                time: '11:00',
                date: luxon_1.DateTime.local(2023, 3, 9),
                length: 90,
                photoFolder: 'vinnetou',
            },
            {
                showName: '(Ne)korektní pravidla',
                groupName: 'Divadelní spolek Kroměříž',
                time: '16:00',
                date: luxon_1.DateTime.local(2023, 3, 9),
                length: 70,
                photoFolder: 'nekorektni-pravidla',
            },
            {
                showName: 'Past na myši',
                groupName: 'Stodola Jiříkovice',
                time: '20:00',
                date: luxon_1.DateTime.local(2023, 3, 9),
                length: 100,
                photoFolder: 'past',
            },
            {
                showName: 'Čuník uprostřed',
                groupName: 'Divadlo Strom Brno',
                time: '17:00',
                date: luxon_1.DateTime.local(2023, 3, 10),
                length: 80,
                photoFolder: 'cunik',
            },
            {
                showName: 'Labyrint světa a ráj srdce',
                groupName: 'Divadelní spolek Jana Honsy Karolinka',
                time: '20:00',
                date: luxon_1.DateTime.local(2023, 3, 10),
                length: 140,
                photoFolder: 'labyrint',
            },
            {
                showName: 'Byl to skřivan',
                groupName: 'Velká Bystřice',
                time: '11:00',
                date: luxon_1.DateTime.local(2023, 3, 11),
                length: 90,
                photoFolder: 'skrivan',
            },
            {
                showName: 'Cesta do Benátek',
                groupName: 'Divadlo Exil Pardubice',
                time: '14:00',
                date: luxon_1.DateTime.local(2023, 3, 11),
                length: 90,
                photoFolder: 'benatky',
            },
            {
                showName: 'Romeo, Julie a tma',
                groupName: 'Ochotnický soubor Lípa Želechovice nad Dřevnicí',
                time: '17:00',
                date: luxon_1.DateTime.local(2023, 3, 11),
                length: 90,
                photoFolder: 'romeo',
            },
            {
                showName: 'Sněhurka a trpaslík',
                groupName: 'Divadelní spolek Pod Lampú Bánov',
                time: '20:30',
                date: luxon_1.DateTime.local(2023, 3, 11),
                length: 80,
                photoFolder: 'trpaslik',
            },
            {
                showName: 'Budeš dělat malé věci (Krakatit)',
                groupName: 'Studio Divadla Haná Vyškov',
                time: '11:00',
                date: luxon_1.DateTime.local(2023, 3, 12),
                length: 60,
                photoFolder: 'krakatit',
            },
            {
                showName: 'Vyhlášení výsledků Divadelního Kojetína',
                groupName: '',
                time: '16:00',
                date: luxon_1.DateTime.local(2023, 3, 12),
                length: null,
            },
        ]);
    }
    getMongoClient() {
        let client = new mongodb_1.MongoClient(process.env.MONGO_URL);
        client.connect();
        return client.db('kjfestival');
    }
};
ShowService = __decorate([
    (0, common_1.Injectable)()
], ShowService);
exports.ShowService = ShowService;
//# sourceMappingURL=show.service.js.map