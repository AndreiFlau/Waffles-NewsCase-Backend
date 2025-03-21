import asyncHandler from "express-async-handler";
import { createUser, getUserByEmail } from "../db/userQueries";
import { createEmailStats } from "../db/emailStatsQueries";
import calculateStreak from "../services/calculateStreak";

const processWebhook = asyncHandler(async (req, res) => {
  try {
    const email = String(req.body.email);
    const newsletterId = Number(req.body.id);

    //utms
    const utmSource = String(req.body.utm_source);
    const utmMedium = String(req.body.utm_medium);
    const utmCampaign = String(req.body.utm_campaign);
    const utmChannel = String(req.body.utm_channel);

    if (isNaN(newsletterId)) {
      res.status(400).json({ message: "Id inválido" });
      return;
    }

    let user = await getUserByEmail(email);
    //adicionar usuário se não existir
    if (!user) {
      user = await createUser(email, false);
    }

    await calculateStreak(user.id);
    await createEmailStats(user.id, newsletterId, utmSource, utmMedium, utmCampaign, utmChannel);

    res.status(200).json({ message: "Webhook processado corretamente" });
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro no processamento do webhook: ${err.message || err}`);
  }
});

export default processWebhook;
