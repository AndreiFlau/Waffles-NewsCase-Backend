import asyncHandler from "express-async-handler";
import { createUser, getUserByEmail } from "../db/userQueries";
import { createStreak } from "../db/streakQueries";
import { createEmailStats } from "../db/emailStatsQueries";

const processWebhook = asyncHandler(async (req, res) => {
  try {
    const email = String(req.query.email);
    const newsletterId = Number(req.query.id);

    //utms
    const utmSource = String(req.query.utm_source);
    const utmMedium = String(req.query.utm_medium);
    const utmCampaign = String(req.query.utm_campaign);
    const utmChannel = String(req.query.utm_channel);

    if (isNaN(newsletterId)) {
      res.status(400).json({ message: "Id inválido" });
      return;
    }

    //adicionar usuário se não existir
    let user = await getUserByEmail(email);
    if (!user) {
      user = await createUser(email, false);
    }

    //criar uma streak para ele
    await createStreak(user.id);

    //atualizar as estátisticas de email
    await createEmailStats(user.id, newsletterId, utmSource, utmMedium, utmCampaign, utmChannel);

    res.status(200).json({ message: "Webhook processado corretamente" });
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro no processamento do webhook: ${err.message || err}`);
  }
});

export default processWebhook;
