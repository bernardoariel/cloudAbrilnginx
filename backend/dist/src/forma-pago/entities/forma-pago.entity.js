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
exports.FormaPago = void 0;
const typeorm_1 = require("typeorm");
let FormaPago = class FormaPago {
};
exports.FormaPago = FormaPago;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], FormaPago.prototype, "CodForPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, nullable: true }),
    __metadata("design:type", String)
], FormaPago.prototype, "TipoForma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], FormaPago.prototype, "FormaPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 3, nullable: true }),
    __metadata("design:type", String)
], FormaPago.prototype, "CodRef", void 0);
exports.FormaPago = FormaPago = __decorate([
    (0, typeorm_1.Entity)('FormaPago')
], FormaPago);
//# sourceMappingURL=forma-pago.entity.js.map