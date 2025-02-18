import { createStreak, getStreakByUserId, updateStreak } from "../db/streakQueries";

async function calculateStreak(userId: number) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = await getStreakByUserId(userId);

    if (!streak) {
      await createStreak(userId);
      return;
    } else {
      const lastOpened = streak.updatedAt;
      lastOpened.setHours(0, 0, 0, 0);

      const timeDifference = today.getTime() - lastOpened.getTime() / (1000 * 60 * 60 * 24);

      if (timeDifference === 1) {
        await updateStreak(userId, streak.currentStreak + 1);
      } else if (timeDifference === 2) {
        const newDate = new Date(lastOpened);
        //pula um dia baseado na última data de abertura, garantido que o próximo dia foi domingo
        newDate.setDate(newDate.getDate() + 1);

        //verifica se é domingo (0)
        if (newDate.getDay() === 0) {
          await updateStreak(userId, streak.currentStreak + 1);
        } else {
          await updateStreak(userId, 1);
        }
      } else {
        await updateStreak(userId, 1);
      }
    }

    return streak;
  } catch (error) {
    const err = error as Error;
    console.error(`Erro no processamento do webhook: ${err.message || err}`);
  }
}

export default calculateStreak;
