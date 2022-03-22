import { PhotoService } from "../photo/photo.service";
export declare class ShowTransformer {
    private photoService;
    constructor(photoService: PhotoService);
    transform(show: any): Promise<object>;
}
