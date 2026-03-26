import { Router } from "express";
import { RequestHandler } from "express";
import { getMockRecommendationController } from "../controllers/ProductController";
import { mock_recommendation_validator } from "../middlewares/ProductMiddleware";
// import { authenticate } from "../middlewares/AuthMiddleware";

const router = Router();

// router.use(authenticate);

export const postChatHandler: RequestHandler = async (req, res) => {
  const userMessage = req.body.message;
  const webhookUrl =
    process.env.N8N_CHAT_WEBHOOK_URL || "http://localhost:5678/webhook-test/chat";

  if (!userMessage) {
    res.status(400).json({
      success: false,
      message: "message is required",
    });
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    res.status(502).json({
      success: false,
      message: "n8n webhook request failed",
      data: errorText,
    });
    return;
  }

  const data = await response.json();

  res.json({ success: true, data });
};

router.post("/", postChatHandler);

// Internal endpoint for n8n to get mock recommendations
router.post(
  "/internal/mock-recommendation",
  mock_recommendation_validator,
  getMockRecommendationController
);

/**
 * example for n8n integration with Gemini AI for chatting feature
 * this route will handle the chat flow:
 * User → Next.js chat UI
     → /api/chat (Node.js)
     → n8n webhook
     → Gemini AI
     → back to UI
 *
 * Internal endpoint at POST /api/v1/chat/internal/mock-recommendation
 * for n8n to call to get product recommendations
 */

export default router;
