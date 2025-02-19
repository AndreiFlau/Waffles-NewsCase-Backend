import asyncHandler from "express-async-handler";
import { getAllEmailStatsQuery, getEmailStatsByIdQuery, getEmailStatsByUserIdQuery } from "../db/emailStatsQueries";

const getAllEmailStats = asyncHandler(async (req, res) => {
  try {
    const emailStats = await getAllEmailStatsQuery();
    res.status(200).json(emailStats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getAllEmailStatsByUserId = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const emailStats = await getEmailStatsByUserIdQuery(userId);
    res.status(200).json(emailStats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getEmailStatsById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  try {
    const emailStats = await getEmailStatsByIdQuery(id);
    res.status(200).json(emailStats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

export { getAllEmailStats, getAllEmailStatsByUserId, getEmailStatsById };
