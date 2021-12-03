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

const downVote = async (id) => {
  const result = await connection.query(
    `
    UPDATE songs SET score = score - 1 WHERE id = $1
    RETURNING *;
  `,
    [id]
  );

  return result.rows[0];
};

const deleteRecommendation = async (id) => {
  await connection.query(
    `
      DELETE FROM songs WHERE id = $1;
    `,
    [id]
  );
};

const getHighScoreRandomRecommendation = async () => {
  const highest = await connection.query(`
    SELECT * FROM songs WHERE score > 10 LIMIT 1000;
  `);

  return highest.rows[Math.floor(Math.random() * highest.rows.length)];
};

const getMediumScoreRandomRecommendation = async () => {
  const medium = await connection.query(`
    SELECT * FROM songs
    WHERE score >= -5 AND  score <= 10
    LIMIT 1000;
  `);

  return medium.rows[Math.floor(Math.random() * medium.rows.length)];
};

const getRandomRecommendation = async () => {
  const all = await connection.query(`
      SELECT * FROM songs LIMIT 1000;
    `);

  return all.rows[Math.floor(Math.random() * all.rows.length)];
};

const getTops = async (amount) => {
  const tops = await connection.query(`
    SELECT * FROM songs ORDER BY score DESC LIMIT $1;
  `, [amount]);

  return tops.rows;
};

export {
  createRecommendation,
  getRecommendationByName,
  getRecommendationByLink,
  upVote,
  downVote,
  deleteRecommendation,
  getRandomRecommendation,
  getHighScoreRandomRecommendation,
  getMediumScoreRandomRecommendation,
  getTops
};
