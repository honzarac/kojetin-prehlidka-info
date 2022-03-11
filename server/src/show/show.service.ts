import { Injectable } from '@nestjs/common';
import {Db, MongoClient} from "mongodb";
import {addMinutes} from "date-fns";
import { formatInTimeZone } from 'date-fns-tz'

@Injectable()
export class ShowService {

  async getShows(date) {
    let shows = this.getMongoClient()
      .collection('shows')
      .find({
        date: {
          $gte: new Date(date),
          $lt: new Date(date.setHours(23, 59)),
        },
      })
    let newShows = await shows.toArray()
    let modulator = 0
    return newShows.map((document) => {
      document.time = formatInTimeZone(addMinutes(new Date(), modulator), 'Europe/Prague', 'HH:mm')
      document.length = 2
      modulator += 3
      return document
    })
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
      ]
    )
  }

  private getMongoClient(): Db {
    let client = new MongoClient(
      process.env.MONGO_URL,
    )
    client.connect()
    return client.db('kjfestival')
  }
}
