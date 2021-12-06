/* eslint-disable no-unused-vars */
export default async function (err, req, res, next) {
  console.error(err);
  return res.sendStatus(500);
}
