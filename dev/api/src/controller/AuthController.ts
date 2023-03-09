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
    }
    
 pool = new Pool({
    user: 'admin',
    host: 'db',
    database: 'foodflow',
    password: 'Dzu%3IjGW831',
    port: 5432,
  });


getUsers = async (): Promise<any[]> => {
    const { rows } = await this.pool.query('SELECT * FROM users');
    console.log(rows);
    return rows;
  };


}