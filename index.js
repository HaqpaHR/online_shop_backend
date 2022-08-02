import express from 'express'
import {sequelize} from "./db.js";
import models from './models/models.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import {__dirname} from "./helpers/dirname.js";
import router from "./routes/index.js";
import handlerErrorMiddleware from './middleware/ErrorHandlingMiddleware.js'

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "..", 'static')))
app.use(fileUpload({}))
app.use('/api', router);


//have to stay on last position because it has not use next()
app.use(handlerErrorMiddleware)

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING!'})
})

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('is connected to db')
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`Server was started on port: ${PORT}`)})
    }catch (e) {
        console.log(e.message)
    }
}

start();