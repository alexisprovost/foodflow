"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const Controller = require('./Controller');
const { Pool } = require('pg');
class AuthController extends Controller {
    constructor() {
        super();
        this.pool = new Pool({
            user: 'admin',
            host: 'db',
            database: 'foodflow',
            password: 'Dzu%3IjGW831',
            port: 5432,
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.pool.query('SELECT * FROM users');
            console.log(rows);
            return rows;
        });
    }
}
