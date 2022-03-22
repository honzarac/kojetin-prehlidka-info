import * as fs from "fs";
import * as path from "path";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PhotoService {

  async loadShowPhotosByFolder(folderName: string): Promise<String[]> {
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
