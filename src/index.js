// require('dotenv').config()

import dotenv from "dotenv"
import connectDB from "./db/index.js"
import express from "express"
import {app} from './app.js'

// const app = express()

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection filed !!!", err);
})



/*
import express from "express"

const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)

        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
} )()
*/