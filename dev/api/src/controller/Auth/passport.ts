import passport from "passport";
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

const jwtopts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtopts, (jwt_payload : any, done : any) => {
        done(null, jwt_payload);
    })

);

export default passport;