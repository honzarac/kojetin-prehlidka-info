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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const show_service_1 = require("./show/show.service");
const show_transformer_1 = require("./show/show.transformer");
const luxon_1 = require("luxon");
let AppController = class AppController {
    constructor(showService) {
        this.showService = showService;
    }
    getHealth() {
        return { status: 'ok' };
    }
    async getShows() {
        let loadDate = luxon_1.DateTime.fromISO('2022-05-14');
        let shows = await this.showService.getShows(loadDate);
        let transformer = new show_transformer_1.ShowTransformer;
        let showPromises = shows.map(async (show) => await transformer.transform(show));
        let dayName = loadDate.setLocale('cs').toFormat('cccc');
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        return {
            dayName: dayName,
            shows: await Promise.all(showPromises)
        };
    }
    import() {
        this.showService.import();
    }
};
__decorate([
    (0, common_1.Get)('/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('/shows'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getShows", null);
__decorate([
    (0, common_1.Get)('/import'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "import", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [show_service_1.ShowService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map