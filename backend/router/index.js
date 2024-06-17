import express from 'express';

const router = express.Router();

router.post('/start', (req, res) => {
    res.send('Success start');
});

router.post('/leave', (req, res) => {
    res.send('Success leave');
});

export default router;
