import { ShowService } from "./show/show.service";
import { ShowTransformer } from "./show/show.transformer";
import { PhotoService } from "./photo/photo.service";
export declare class AppController {
    private showService;
    private showTransformer;
    private photoService;
    constructor(showService: ShowService, showTransformer: ShowTransformer, photoService: PhotoService);
    getHealth(): object;
    getShows(): Promise<object>;
    import(): void;
}
