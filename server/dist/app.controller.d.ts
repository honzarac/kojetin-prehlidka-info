import { ShowService } from "./show/show.service";
export declare class AppController {
    private showService;
    constructor(showService: ShowService);
    getHealth(): object;
    getShows(): Promise<object>;
    import(): void;
}
