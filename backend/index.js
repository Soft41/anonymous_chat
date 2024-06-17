import express from 'express';
import router from './router/index.js';

const PORT = 5000;
const app = express();

app.use('/', router);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Good start, PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
