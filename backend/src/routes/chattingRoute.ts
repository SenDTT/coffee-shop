import { Router } from "express";
// import { authenticate } from "../middlewares/AuthMiddleware";

const router = Router();

// router.use(authenticate);

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("http://localhost:5678/webhook/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userMessage
    })
  });

  const data = await response.json();

  res.json(data);
});

/**
 * example for n8n integration with Gemini AI for chatting feature
 * this route will handle the chat flow:
 * User → Next.js chat UI
     → /api/chat (Node.js)
     → n8n webhook
     → Gemini AI
     → back to UI
 */

export default router;