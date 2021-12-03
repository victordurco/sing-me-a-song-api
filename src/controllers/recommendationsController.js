import {
  newRecommendationSchema,
  upVoteSchema,
  getTopAmountSchema
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

const getRandom = async (req, res) => {
  try {
    const recommendation = await recommendationsService.getRandom();
    return res.status(200).send(recommendation);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getTopAmount = async (req, res) => {
  try {
    const { amount } = req.params;
    const validation = getTopAmountSchema.validate(req.params);

    if (validation.error) {
      return res.sendStatus(400);
    }

    const tops = await recommendationsService.getTops(amount);
    return res.status(200).send(tops);
  } catch (error) {
    return res.sendStatus(500);
  }
};
export {
  createRecomendation, upVoteRecommendation, getRandom, getTopAmount
};
