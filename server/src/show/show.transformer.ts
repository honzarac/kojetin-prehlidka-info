import * as fs from "fs";
import * as path from "path";

export class ShowTransformer {

  transform(show): Promise<object> {
    return new Promise<object> ((resolve, reject) => {
        this.getPhotos(show.photoFolder)
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

  private async getPhotos(folderName): Promise<String[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(
        path.join(process.cwd(), './static/shows/', folderName),
        (err, files) => {
          if (err) {
            reject(err)
            return
          }
          resolve(files.map((fileName) => 'http://localhost:3001/static/shows/' + folderName + '/' + fileName))
        });
    })
  }
}
