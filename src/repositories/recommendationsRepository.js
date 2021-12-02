import connection from '../database.js';

const createRecommendation = async ({ name, youtubeLink }) => {
  const result = await connection.query(
    `
        INSERT INTO songs (name, youtube_link, score) VALUES ($1, $2, $3)
        RETURNING *;
    `,
    [name, youtubeLink, 0]
  );

  return result.rows[0];
};

const getRecommendationByName = async (name) => {
  const result = await connection.query(
    `
    SELECT * FROM songs WHERE songs.name = $1;
  `,
    [name]
  );

  return result.rows[0];
};

const getRecommendationByLink = async (youtubeLink) => {
  const result = await connection.query(
    `
    SELECT * FROM songs WHERE songs.youtube_link = $1;
  `,
    [youtubeLink]
  );

  return result.rows[0];
};

const upVote = async (id) => {
  const result = await connection.query(
    `
    UPDATE songs SET score = score + 1 WHERE id = $1
    RETURNING *;
  `,
    [id]
  );

  return result.rows[0];
};

export {
  createRecommendation,
  getRecommendationByName,
  getRecommendationByLink,
  upVote,
};
