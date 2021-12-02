import {
  newRecommendationSchema,
  upVoteSchema,
} from '../schemas/recommendationSchema.js';

import * as recommendationsService from '../services/recommendationsService.js';

const createRecomendation = async (req, res) => {
  const { name, youtubeLink } = req.body;
  const validation = newRecommendationSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const created = await recommendationsService.createRecommendation({
      name,
      youtubeLink,
    });

    if (created) {
      return res.sendStatus(201);
    }

    return res.sendStatus(409);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const upVoteRecommendation = async (req, res) => {
  const { id } = req.params;
  const validation = upVoteSchema.validate(req.params);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const voted = await recommendationsService.upVote(id);

    if (voted) return res.sendStatus(204);
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { createRecomendation, upVoteRecommendation };
