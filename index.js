import express from 'express'
import {sequelize} from "./db.js";
import models from './models/models.js';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())

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