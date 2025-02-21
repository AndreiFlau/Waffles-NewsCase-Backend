import asyncHandler from "express-async-handler";
import { getAllStreaksQuery, getStreakByIdQuery, getStreakByUserIdQuery, getStreaksAvgQuery } from "../db/streakQueries";

const getAllStreaks = asyncHandler(async (req, res) => {
  try {
    const streaks = await getAllStreaksQuery();
    res.status(200).json(streaks);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as streaks: ${err.message || err}`);
  }
});

const getStreakAverage = asyncHandler(async (req, res) => {
  try {
    const streaks = await getStreaksAvgQuery();
    res.status(200).json(streaks);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber todas as streaks: ${err.message || err}`);
  }
});

const getStreakByUserId = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const streaks = await getStreakByUserIdQuery(userId);
    res.status(200).json(streaks);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber streak de certo usuário: ${err.message || err}`);
  }
});

const getMyStreak = asyncHandler(async (req, res) => {
  const userId = Number(req.user.userId);
  try {
    const streak = await getStreakByUserIdQuery(userId);
    res.status(200).json(streak);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber streak de usuário logado: ${err.message || err}`);
  }
});

const getStreakById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  try {
    const streaks = await getStreakByIdQuery(id);
    res.status(200).json(streaks);
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao receber streak pro ID: ${err.message || err}`);
  }
});

export { getAllStreaks, getStreakByUserId, getStreakById, getMyStreak, getStreakAverage };
