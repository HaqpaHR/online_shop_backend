import ErrorApi from "../handlers/errorApi.js";
import {Basket, User} from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateJWT(id, email, role) {
    return jwt.sign({
        id, email, role
    }, process.env.SECRET_KEY, {expiresIn: '2h'})
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body;
        if(!email||!password){
            return next(ErrorApi.badRequest('Не верный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            return next(ErrorApi.internal('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id});
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            next(ErrorApi.badRequest('Не верный пароль'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async authentication(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default new UserController()