import {PhotoService} from "../photo/photo.service";
import {Injectable} from "@nestjs/common";
import { DateTime } from "luxon";

@Injectable()
export class ShowTransformer {
  constructor(
    private photoService: PhotoService
  ) {}

  transform(show): Promise<object> {
    return new Promise<object> ((resolve, reject) => {
      this.photoService.loadShowPhotosByFolder(show.photoFolder)
        .then((photos) => {
          resolve({
            showName: show.showName,
            groupName: show.groupName,
            time: show.time,
            date: show.date,
            length: show.length,
            photos: photos,
          })
        })
        .catch((reason) => resolve({
          showName: show.showName,
          groupName: show.groupName,
          time: show.time,
          date: show.date,
          length: show.length,
          photos: [],
        }))
      }
    )
  }
}
