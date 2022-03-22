"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowTransformer = void 0;
const photo_service_1 = require("../photo/photo.service");
const common_1 = require("@nestjs/common");
let ShowTransformer = class ShowTransformer {
    constructor(photoService) {
        this.photoService = photoService;
    }
    transform(show) {
        return new Promise((resolve, reject) => {
            this.photoService.loadShowPhotosByFolder(show.photoFolder)
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
                .catch((reason) => resolve({
                showName: show.showName,
                groupName: show.groupName,
                time: show.time,
                date: show.date,
                length: show.length,
                photos: [],
            }));
        });
    }
};
ShowTransformer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], ShowTransformer);
exports.ShowTransformer = ShowTransformer;
//# sourceMappingURL=show.transformer.js.map