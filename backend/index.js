import express from 'express'

const PORT = 5000;

const app = express()

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Good start, PORT: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()