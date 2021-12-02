import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

const createRecommendation = async ({ name, youtubeLink }) => {
  const nameExists = await recommendationsRepository.getRecommendationByName(
    name
  );
  const linkExists = await recommendationsRepository.getRecommendationByLink(
    youtubeLink
  );

  if (nameExists || linkExists) {
    return false;
  }

  await recommendationsRepository.createRecommendation({ name, youtubeLink });

  return true;
};

const upVote = async (id) => {
  const updated = await recommendationsRepository.upVote(id);

  if (updated) return true;
  return false;
};

export { createRecommendation, upVote };
