import { Controller, Get } from '@nestjs/common';
import {ShowService} from "./show/show.service";
import { format } from 'date-fns'

@Controller()
export class AppController {
  constructor(private showService: ShowService) {}

  @Get('/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  @Get('/shows')
  async getShows(): Promise<object> {
    let loadDate = new Date('2022-05-12')
    let days = {3: 'Středa', 4: 'Čtvrtek', 5: 'Pátek', 6: 'Sobota', 7: 'Neděle'}

    return {
      dayName: days[format(loadDate, 'i')],
      shows: await this.showService.getShows(loadDate)
    };
  }

  @Get('/import')
  import(): void {
    this.showService.import();
  }
}
