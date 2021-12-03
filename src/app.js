import './setup.js';
import express from 'express';
import cors from 'cors';

import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.post('/recommendations', recommendationsController.createRecomendation);

app.post(
  '/recommendations/:id/upvote',
  recommendationsController.upVoteRecommendation
);

app.get('/recommendations/random', recommendationsController.getRandom);

app.get('/recommendations/top/:amount', recommendationsController.getTopAmount);

export default app;
