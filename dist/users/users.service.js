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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const newUser_entity_1 = require("./newUser.entity");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOneByEmail(mail) {
        return this.usersRepository.findOneBy({ mail });
    }
    findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async blockUser(id) {
        await this.usersRepository.update({ id }, { blocked: true });
    }
    async removeUser(id) {
        await this.usersRepository.delete(id);
    }
    getDayReg() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    }
    getName(mail) {
        return mail.split('@')[0];
    }
    async addNewUser(data) {
        const user = new newUser_entity_1.User();
        user.name = this.getName(data.mail);
        user.password = data.password;
        user.mail = data.mail;
        user.stateUser = true;
        user.dateReg = this.getDayReg();
        user.lastLog = new Date().getDate();
        user.blocked = false;
        await this.usersRepository.save(user);
        return common_1.HttpStatus.OK;
    }
    async updateUserStatus(id, state) {
        console.log(id);
        console.log(state);
        const user = await this.usersRepository.findOneBy({ id });
        console.log(user);
        user.blocked = state;
        console.log(user.blocked);
        await this.usersRepository.save(user);
        return user;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(newUser_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map