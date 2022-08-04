import jwt from "jsonwebtoken";

export default function checkRoleMiddleware(role) {
    return function (req, res, next) {
        if(req.method === "OPTION") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role){
                return res.status(403).json({message: "У вас нет доступа"})
            }
            req.user = decoded;
            next()
        }catch (e) {
            return res.status(401).json({message: "Не авторизован"})
        }
    }
}