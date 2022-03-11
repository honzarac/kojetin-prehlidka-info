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
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
let ShowService = class ShowService {
    async getShows(date) {
        let shows = this.getMongoClient()
            .collection('shows')
            .find({
            date: {
                $gte: new Date(date),
                $lt: new Date(date.setHours(23, 59)),
            },
        });
        let newShows = await shows.toArray();
        let modulator = 0;
        return newShows.map((document) => {
            document.time = (0, date_fns_tz_1.formatInTimeZone)((0, date_fns_1.addMinutes)(new Date(), modulator), 'Europe/Prague', 'HH:mm');
            document.length = 2;
            modulator += 3;
            return document;
        });
    }
    import() {
        this.getMongoClient()
            .collection('shows')
            .insertMany([
            {
                showName: 'Zahájení přehlídky',
                groupName: '',
                time: '20:00',
                date: new Date(2022, 4, 11),
                length: null,
            },
            {
                showName: 'Bordel na ministerstvu',
                groupName: 'Hanácká scéna Kojetín',
                time: '20:00',
                date: new Date(2022, 4, 11),
                length: 95,
            },
            {
                showName: 'Dášeňka čili život štěnete',
                groupName: 'Divadlo Scéna Zlín',
                time: '8:15',
                date: new Date(2022, 4, 12),
                length: 90,
            },
            {
                showName: 'Dášeňka čili život štěnete',
                groupName: 'Divadlo Scéna Zlín',
                time: '10:00',
                date: new Date(2022, 4, 12),
                length: 90,
            },
            {
                showName: 'Dům Bernardy Alby',
                groupName: 'DS ASpol. Lužánky Brno',
                time: '16:00',
                date: new Date(2022, 4, 12),
                length: 90,
            },
            {
                showName: 'Velká zebra aneb jakže se to jmenujete?',
                groupName: 'Divadelní spolek Kroměříž',
                time: '20:00',
                date: new Date(2022, 4, 12),
                length: 90,
            },
            {
                showName: 'O PRINCEZNĚ, KTERÁ RÁČKOVALA',
                groupName: 'Divadlo Scéna Zlín',
                time: '10:00',
                date: new Date(2022, 4, 13),
                length: 90,
            },
            {
                showName: 'MANŽELÉ V NESNÁZÍCH',
                groupName: 'Divadelní spolek Slavkov u Brna',
                time: '16:00',
                date: new Date(2022, 4, 13),
                length: 80,
            },
            {
                showName: 'TRHNI SI, OTČE!',
                groupName: 'Divadlo Brod Uherský Brod',
                time: '20:00',
                date: new Date(2022, 4, 13),
                length: 90,
            },
            {
                showName: 'Edith',
                groupName: 'Divadlo Blic Ostrožská Nová Ves',
                time: '11:00',
                date: new Date(2022, 4, 14),
                length: 105,
            },
            {
                showName: 'Pan Polšťář',
                groupName: 'Ragueneau Plzeň',
                time: '16:00',
                date: new Date(2022, 4, 14),
                length: 100,
            },
            {
                showName: 'Baletky',
                groupName: 'Divadlo Václav Václavov',
                time: '20:00',
                date: new Date(2022, 4, 14),
                length: 65,
            },
            {
                showName: 'Koprovka aneb Na útěku',
                groupName: 'Blanenské divadlo',
                time: '11:00',
                length: 70,
                date: new Date(2022, 4, 15),
            },
            {
                showName: 'VYHLÁŠENÍ VÝSLEDKŮ A UKONČENÍ',
                groupName: '',
                time: '16:00',
                date: new Date(2022, 4, 15),
                length: 60,
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