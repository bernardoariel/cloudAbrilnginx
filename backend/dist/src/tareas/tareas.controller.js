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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareasController = void 0;
const common_1 = require("@nestjs/common");
const tareas_service_1 = require("./tareas.service");
let TareasController = class TareasController {
    constructor(tareasService) {
        this.tareasService = tareasService;
    }
    async ejecutarTareaManual() {
        return this.tareasService.ejecutarTareaManual();
    }
    async renovarPassword(email) {
        try {
            return await this.tareasService.renovarPasswordDesdeCRM(email);
        }
        catch (error) {
            console.log(`Error al renovar contraseña para ${email}:`, error);
            throw error;
        }
    }
};
exports.TareasController = TareasController;
__decorate([
    (0, common_1.Post)('ejecutar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "ejecutarTareaManual", null);
__decorate([
    (0, common_1.Post)('renovar-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "renovarPassword", null);
exports.TareasController = TareasController = __decorate([
    (0, common_1.Controller)('tareas'),
    __metadata("design:paramtypes", [tareas_service_1.TareasService])
], TareasController);
//# sourceMappingURL=tareas.controller.js.map