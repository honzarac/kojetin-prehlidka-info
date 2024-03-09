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
    let loadDate = DateTime.fromISO(DateTime.now().toFormat('yyyy') + '-03-10')

    let shows = await this.showService.getShows(loadDate)
    let showsPromises = shows.map(async (show) => await this.showTransformer.transform(show))

    let lastYearPhotos = await this.photoService.loadShowPhotosByFolder('2023')
    return {
      shows: await Promise.all(showsPromises),
      lastYearPhotos: lastYearPhotos,
    };
  }

  @Get('/import')
  import() {
    this.showService.import();
    return {status: 'ok'}
  }
}
