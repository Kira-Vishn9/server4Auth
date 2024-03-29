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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let AuthService = exports.AuthService = AuthService_1 = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    addToken(token, userId) {
        AuthService_1._tokens[token] = userId;
    }
    checkToken(token) {
        return !!AuthService_1._tokens[token];
    }
    getIdByToken(token) {
        return AuthService_1._tokens[token];
    }
    removeToken(token) {
        delete AuthService_1._tokens[token];
    }
    async validateUser(mail, pass) {
        const user = await this.usersService.findOneByEmail(mail);
        if (user && user.password === pass && !user.blocked) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async checkIsUserAllowed(id) {
        const user = await this.usersService.findOne(id);
        const isBlocked = user?.blocked;
        return !!user && !isBlocked;
    }
    addNewUser(user) {
        return this.usersService.addNewUser(user);
    }
    updateUserStatus(id, state) {
        return this.usersService.updateUserStatus(id, state);
    }
};
AuthService._tokens = {};
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map