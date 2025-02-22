import asyncHandler from "express-async-handler";
import {
  getAllEmailStatsQuery,
  getEmailStatsByIdQuery,
  getEmailStatsByUserIdQuery,
  getNewsletterStatsByDateQuery,
  getNewsletterOpenCountQuery,
} from "../db/emailStatsQueries";
import { getActiveUsersQuery } from "../db/userQueries";
import { getStreakRankQuery, getStreakStatsQuery } from "../db/streakQueries";

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

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await getActiveUsersQuery();
    res.status(200).json(users);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getStreakRank = asyncHandler(async (req, res) => {
  try {
    const rank = await getStreakRankQuery();
    res.status(200).json(rank);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getNewsletterOpenCount = asyncHandler(async (req, res) => {
  try {
    const stats = await getNewsletterOpenCountQuery();
    res.status(200).json(stats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getNewsletterByDate = asyncHandler(async (req, res) => {
  try {
    const days = Number(req.query.days);

    if (isNaN(days)) {
      res.status(400).json({ message: 'A query "days" deve ser um número válido.' });
      return;
    }

    const stats = await getNewsletterStatsByDateQuery(days);
    res.status(200).json(stats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

const getStreakStats = asyncHandler(async (req, res) => {
  try {
    const stats = await getStreakStatsQuery();
    res.status(200).json(stats);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as estátisticas de email: ${err.message || err}`);
  }
});

export {
  getAllEmailStats,
  getAllEmailStatsByUserId,
  getEmailStatsById,
  getAllUsers,
  getStreakRank,
  getNewsletterOpenCount,
  getNewsletterByDate,
  getStreakStats,
};
