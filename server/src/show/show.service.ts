import { Injectable } from '@nestjs/common';
import {Db, MongoClient} from "mongodb";
import { DateTime } from "luxon";

@Injectable()
export class ShowService {

  async getShows(date) {
    let shows = this.getMongoClient()
      .collection('shows')
      .find({
        date: {
          $gte: date,
        },
      })
    let newShows = await shows.toArray()

    return newShows
  }

  import() {
    this.getMongoClient()
      .collection('shows')
      .deleteMany({})

    this.getMongoClient()
      .collection('shows')
      .insertMany([
        {
          showName: 'Zahájení přehlídky',
          groupName: '',
          time: '20:00',
          date: DateTime.local(2024, 3, 6),
          length: null,
        },
        {
          showName: 'Mariáš života',
          groupName: 'DS Kroměříž',
          time: '20:10',
          date: DateTime.local(2024, 3, 6),
          length: 65,
          photoFolder: 'marias',
        },
        {
          showName: 'Trojlístek pohádek',
          groupName: 'Divadýlko Mrak',
          time: '08:15',
          date: DateTime.local(2024, 3, 7),
          length: 70,
          photoFolder: 'trojlistek',
        },
        {
          showName: 'Trojlístek pohádek',
          groupName: 'Divadýlko Mrak',
          time: '10:00',
          date: DateTime.local(2024, 3, 7),
          length: 60,
          photoFolder: 'trojlistek',
        },
        {
          showName: 'Upokojenkyně',
          groupName: 'Divadelní spolek J. K. Tyl Brodek u Přerova',
          time: '20:00',
          date: DateTime.local(2024, 3, 7),
          length: 90,
          photoFolder: 'upokojenkyne',
        },
        {
          showName: 'S čerty nejsou žerty',
          groupName: 'Metropolitní divadlo Praha',
          time: '11:00',
          date: DateTime.local(2024, 3, 8),
          length: 60,
          photoFolder: 'certi',
        },
        {
          showName: 'Vichřice v domě č. 11',
          groupName: 'Studio SEN Olomouc',
          time: '17:00',
          date: DateTime.local(2024, 3, 8),
          length: 60,
          photoFolder: 'vychrice',
        },
        {
          showName: 'Tři holky jako květ',
          groupName: 'Smotaná hadice Křenovice',
          time: '20:00',
          date: DateTime.local(2024, 3, 8),
          length: 110,
          photoFolder: 'kvet',
        },
        {
          showName: 'Kandidát',
          groupName: 'Divadelní studio Viktorka Holešov',
          time: '11:00',
          date: DateTime.local(2024, 3, 9),
          length: 75,
          photoFolder: 'kandidat',
        },
        {
          showName: 'Marie, dcera Kajetánova',
          groupName: 'Morkovští ochotníci',
          time: '16:00',
          date: DateTime.local(2024, 3, 9),
          length: 70,
          photoFolder: 'marie',
        },
        {
          showName: 'Není co skrývat',
          groupName: 'Divadlo Dostavník Přerov',
          time: '20:00',
          date: DateTime.local(2024, 3, 9),
          length: 90,
          photoFolder: 'dostavnik',
        },
        {
          showName: 'Zařídil ti to Povondra (Válka s mloky)',
          groupName: 'Studio divadla Haná Vyškov',
          time: '10:00',
          date: DateTime.local(2024, 3, 10),
          length: 85,
          photoFolder: 'mloci',
        },
        {
          showName: 'Jeppe',
          groupName: 'Dohráli jsme Uherské Hradiště',
          time: '13:00',
          date: DateTime.local(2024, 3, 10),
          length: 80,
          photoFolder: 'jeppe',
        },
        {
          showName: 'Vyhlášení výsledků Divadelního Kojetína',
          groupName: '',
          time: '16:30',
          date: DateTime.local(2024, 3, 10),
          length: null,
          photoFolder: 'vyhlaseni'
        },
      ])
  }

  private getMongoClient(): Db {
    let client = new MongoClient(
      process.env.MONGO_URL,
    )
    client.connect()
    return client.db('kjfestival')
  }
}
