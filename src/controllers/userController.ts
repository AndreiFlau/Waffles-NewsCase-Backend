import asyncHandler from "express-async-handler";

const processWebhook = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro no processamento do webhook: ${err.message || err}`);
  }
});
