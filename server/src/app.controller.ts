import { Controller, Get } from '@nestjs/common';
import {ShowService} from "./show/show.service";
import {ShowTransformer} from "./show/show.transformer";
import { DateTime } from "luxon";

@Controller()
export class AppController {
  constructor(private showService: ShowService) {}

  @Get('/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('/shows')
  async getShows(): Promise<object> {
    let loadDate = DateTime.fromISO('2022-05-14')

    let shows = await this.showService.getShows(loadDate)
    let transformer = new ShowTransformer
    let showPromises = shows.map(async (show) => await transformer.transform(show))

    let dayName = loadDate.setLocale('cs').toFormat('cccc')
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return {
      dayName: dayName,
      shows: await Promise.all(showPromises)
    };
  }

  @Get('/import')
  import(): void {
    this.showService.import();
  }
}
