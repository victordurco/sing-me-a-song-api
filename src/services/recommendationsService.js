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

const voteRecommendation = async ({ id, type }) => {
  let updated;
  if (type === 'up') {
    updated = await recommendationsRepository.upVote(id);
  } else {
    updated = await recommendationsRepository.downVote(id);
  }

  if (updated) return true;
  return false;
};

const getRandom = async () => {
  if (Math.random() * 10 > 3) {
    // 70% of the times: recommendation with score > 10
    const scoreBiggerThan10 = await recommendationsRepository.getHighScoreRandomRecommendation();
    if (!scoreBiggerThan10) {
      const recommendation = await recommendationsRepository.getRandomRecommendation();
      return recommendation;
    }
    return scoreBiggerThan10;
  }
  // 30%of the times: recommendation with 10 >= score >= -5
  const mediumScore = await recommendationsRepository.getMediumScoreRandomRecommendation();
  if (!mediumScore) {
    const recommendation = await recommendationsRepository.getRandomRecommendation();
    return recommendation;
  }
  return mediumScore;
};

const getTops = async (amount) => {
  const tops = await recommendationsRepository.getTops(amount);
  return tops;
};

export {
  createRecommendation, voteRecommendation, getRandom, getTops
};
