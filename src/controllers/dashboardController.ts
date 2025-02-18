import asyncHandler from "express-async-handler";

const processWebhook = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Error when processing the webhook: ${err.message || err}`);
  }
});
