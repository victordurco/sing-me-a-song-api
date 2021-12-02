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

export default app;
