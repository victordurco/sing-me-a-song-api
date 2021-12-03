/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import joi from 'joi';

const newRecommendationSchema = joi.object({
  name: joi.string().min(2).required(),
  youtubeLink: joi
    .string()
    .required()
    .pattern(
      /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
    ),
});

const upVoteSchema = joi.object({
  id: joi.number().min(1).required(),
});

const getTopAmountSchema = joi.object({
  amount: joi.number().min(1).required(),
});

export { newRecommendationSchema, upVoteSchema, getTopAmountSchema };
