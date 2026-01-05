import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import prisma from "../config/prisma";
import { PassportStatic } from 'passport';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
};

export const configurePassport = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(options, async(payload, done) => {
            try{
                const user = await prisma.user.findUnique({
                    where:{id: payload.id}
                });
                if(user){
                    return done(null, user)
                }
                return done(null, false);
            }
            catch(error){
                console.log(error);
                return done(error,false);
            }
        })
    )
}