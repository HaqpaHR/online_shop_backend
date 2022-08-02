import ErrorApi from "../handlers/errorApi.js";

export default function ErrorHandlingMiddleware(err, req, res, next) {
    if(err instanceof ErrorApi){
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка"})
}