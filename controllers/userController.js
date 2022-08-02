import ErrorApi from "../handlers/errorApi.js";

class UserController {
    async registration(req, res){

    }

    async login(req, res){

    }

    async authentication(req, res, next){
        const {id} = req.query;
        if(!id) {
           return next(ErrorApi.badRequest('Have no ID'))
        }
        res.json(id)
    }
}

export default new UserController()