import asyncHandler from "express-async-handler";
import { getEmailStatsByUserIdQuery } from "../db/emailStatsQueries";
import { getMyBadgesQuery } from "../db/userQueries";

const getMyNewsletterHistory = asyncHandler(async (req, res) => {
  const userId = Number(req.user.userId);
  try {
    const newsletters = await getEmailStatsByUserIdQuery(userId);
    res.status(200).json(newsletters);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber estátisticas de newsletters de usuário logado: ${err.message || err}`);
  }
});

const getMyBadges = asyncHandler(async (req, res) => {
  const userId = Number(req.user.userId);
  try {
    const badges = await getMyBadgesQuery(userId);
    res.status(200).json(badges);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber estátisticas de newsletters de usuário logado: ${err.message || err}`);
  }
});

export { getMyNewsletterHistory, getMyBadges };
