import { Controller, Get } from '@nestjs/common';
import {ShowService} from "./show/show.service";
import {ShowTransformer} from "./show/show.transformer";
import { DateTime } from "luxon";
import {PhotoService} from "./photo/photo.service";

@Controller()
export class AppController {
  constructor(
    private showService: ShowService,
    private showTransformer: ShowTransformer,
    private photoService: PhotoService
  ) {}

  @Get('/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('/shows')
  async getShows(): Promise<object> {
    let loadDate = DateTime.fromISO('2023-03-08')

    let shows = await this.showService.getShows(loadDate)
    let showsPromises = shows.map(async (show) => await this.showTransformer.transform(show))
    let showsTomorrow = await this.showService.getShows(loadDate.plus({days: 1}))
    let showsTomorrowPromises = showsTomorrow.map(async (show) => await this.showTransformer.transform(show))

    let dayName = loadDate.setLocale('cs').toFormat('cccc')
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    let lastYearPhotos = await this.photoService.loadShowPhotosByFolder('2022')
    return {
      shows: await Promise.all(showsPromises),
      showsTomorrow: await Promise.all(showsTomorrowPromises),
      lastYearPhotos: lastYearPhotos.map(url => ({url, showName: ''}))
    };
  }

  @Get('/import')
  import(): void {
    this.showService.import();
  }
}
