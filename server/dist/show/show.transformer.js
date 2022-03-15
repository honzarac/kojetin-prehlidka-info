"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowTransformer = void 0;
const fs = require("fs");
const path = require("path");
class ShowTransformer {
    transform(show) {
        return new Promise((resolve, reject) => {
            this.getPhotos(show.photoFolder)
                .then((photos) => {
                resolve({
                    showName: show.showName,
                    groupName: show.groupName,
                    time: show.time,
                    date: show.date,
                    length: show.length,
                    photos: photos,
                });
            })
                .catch((reason) => { reject('Nepodařilo se najít složku s fotkama: ' + show.photoFolder + ' s chybou ' + reason); });
        });
    }
    async getPhotos(folderName) {
        return new Promise((resolve, reject) => {
            fs.readdir(path.join(process.cwd(), './static/shows/', folderName), (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files.map((fileName) => 'http://localhost:3001/static/shows/' + folderName + '/' + fileName));
            });
        });
    }
}
exports.ShowTransformer = ShowTransformer;
//# sourceMappingURL=show.transformer.js.map