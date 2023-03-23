import passport from "passport";
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import { JWTSECRET } from '../../../config';

const jwtopts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSECRET,
};

passport.use(
    new JwtStrategy(jwtopts, (jwt_payload : any, done : any) => {
        done(null, jwt_payload);
    })

);

export default passport;