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
          showName: 'Kosí bratři',
          groupName: 'Scéna Zlín',
          time: '8:15',
          date: DateTime.local(2023, 3, 8),
          length: 90,
          photoFolder: 'kosibratri',
        },
        {
          showName: 'Kosí bratři',
          groupName: 'Scéna Zlín',
          time: '10:15',
          date: DateTime.local(2023, 3, 8),
          length: 90,
          photoFolder: 'kosibratri',
        },
        {
          showName: 'Zahájení přehlídky',
          groupName: '',
          time: '20:00',
          date: DateTime.local(2023, 3, 8),
          length: null,
        },
        {
          showName: 'Haná se nesódí',
          groupName: 'Mimoni Kojetín',
          time: '20:00',
          date: DateTime.local(2023, 3, 8),
          length: 70,
          photoFolder: 'hana',
        },
        {
          showName: 'Vinnetou',
          groupName: 'Scéna Zlín',
          time: '11:00',
          date: DateTime.local(2023, 3, 9),
          length: 90,
          photoFolder: 'vinnetou',
        },
        {
          showName: '(Ne)korektní pravidla',
          groupName: 'Divadelní spolek Kroměříž',
          time: '16:00',
          date: DateTime.local(2023, 3, 9),
          length: 70,
          photoFolder: 'nekorektni-pravidla',
        },
        {
          showName: 'Past na myši',
          groupName: 'Stodola Jiříkovice',
          time: '20:00',
          date: DateTime.local(2023, 3, 9),
          length: 100,
          photoFolder: 'past',
        },
        {
          showName: 'Čuník uprostřed',
          groupName: 'Divadlo Strom Brno',
          time: '17:00',
          date: DateTime.local(2023, 3, 10),
          length: 80,
          photoFolder: 'cunik',
        },
        {
          showName: 'Labyrint světa a ráj srdce',
          groupName: 'Divadelní spolek Jana Honsy Karolinka',
          time: '20:00',
          date: DateTime.local(2023, 3, 10),
          length: 140,
          photoFolder: 'labyrint',
        },
        {
          showName: 'Byl to skřivan',
          groupName: 'Velká Bystřice',
          time: '11:00',
          date: DateTime.local(2023, 3, 11),
          length: 90,
          photoFolder: 'skrivan',
        },
        {
          showName: 'Cesta do Benátek',
          groupName: 'Divadlo Exil Pardubice',
          time: '14:00',
          date: DateTime.local(2023, 3, 11),
          length: 90,
          photoFolder: 'benatky',
        },
        {
          showName: 'Romeo, Julie a tma',
          groupName: 'Ochotnický soubor Lípa Želechovice nad Dřevnicí',
          time: '17:00',
          date: DateTime.local(2023, 3, 11),
          length: 90,
          photoFolder: 'romeo',
        },
        {
          showName: 'Sněhurka a trpaslík',
          groupName: 'Divadelní spolek Pod Lampú Bánov',
          time: '20:30',
          date: DateTime.local(2023, 3, 11),
          length: 80,
          photoFolder: 'trpaslik',
        },
        {
          showName: 'Budeš dělat malé věci (Krakatit)',
          groupName: 'Studio Divadla Haná Vyškov',
          time: '11:00',
          date: DateTime.local(2023, 3, 12),
          length: 60,
          photoFolder: 'krakatit',
        },
        {
          showName: 'Vyhlášení výsledků Divadelního Kojetína',
          groupName: '',
          time: '16:00',
          date: DateTime.local(2023, 3, 12),
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
