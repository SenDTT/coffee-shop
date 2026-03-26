# Coffee App n8n Workflow

This demo uses:

- a backend mock internal API endpoint at `POST /api/v1/products/internal/mock-recommendation`
- an n8n workflow that calls that endpoint with an `HTTP Request` node
- a `MongoDB` node that stores each run in a `workflow_logs` collection
- the existing backend chat route at `POST /api/v1/chat/` to trigger the n8n webhook from the app

## 1. Start the backend

From `backend/`:

```bash
npm install
npm test
npm run dev
```

The mock internal API endpoint will be available at:

```text
http://localhost:5000/api/v1/products/internal/mock-recommendation
```

## 2. Create the n8n workflow

Create a new workflow named `Coffee Internal API Demo`.

### Node 1: Webhook

- Add a `Webhook` node
- HTTP Method: `POST`
- Path: `coffee-demo`
- Response mode: `Using Respond to Webhook node`

Expected sample request body:

```json
{
  "customerName": "Alex",
  "mood": "needs energy",
  "temperature": "iced",
  "category": "coffee"
}
```

### Node 2: Set

- Add a `Set` node after the webhook
- Keep only the fields you want to send to the internal API
- Create these fields from the webhook payload:

```text
customerName = {{$json.customerName}}
mood = {{$json.mood}}
temperature = {{$json.temperature}}
category = {{$json.category}}
receivedAt = {{$now}}
```

This keeps the workflow payload clean and easy to debug.

### Node 3: HTTP Request

- Add an `HTTP Request` node after `Set`
- Method: `POST`
- URL:
  - local machine: `http://localhost:5000/api/v1/products/internal/mock-recommendation`
  - if n8n runs in Docker and backend runs on host: `http://host.docker.internal:5000/api/v1/products/internal/mock-recommendation`
  - if both run in Docker Compose: use the backend service name, for example `http://backend:5000/api/v1/products/internal/mock-recommendation`
- Send Body: `JSON`
- JSON Body:

```json
{
  "customerName": "={{$json.customerName}}",
  "mood": "={{$json.mood}}",
  "temperature": "={{$json.temperature}}",
  "category": "={{$json.category}}"
}
```

This is the key integration node for your demo.

### Node 4: MongoDB

- Add a `MongoDB` node after `HTTP Request`
- Operation: `Insert`
- Credentials: connect to the same MongoDB used by the coffee app, or any demo MongoDB instance
- Database: `coffee_shop`
- Collection: `workflow_logs`

Document:
workflow,receivedAt,customerName,mood,temperature,category,internalApiResponse
```json
{
  "workflow": "coffee-demo",
  "receivedAt": "={{$node['Set'].json.receivedAt}}",
  "customerName": "={{$node['Set'].json.customerName}}",
  "mood": "={{$node['Set'].json.mood}}",
  "temperature": "={{$node['Set'].json.temperature}}",
  "category": "={{$node['Set'].json.category}}",
  "internalApiResponse": "={{$node['HTTP Request'].json}}"
}
```

This gives you a clean audit trail showing:

- what n8n received
- what it sent to the internal API
- what the internal API returned

### Node 5: Respond to Webhook

- Add `Respond to Webhook` after `MongoDB`
- Response Code: `200`
- Response Body:

```json
{
  "success": true,
  "message": "Workflow completed",
  "recommendation": "={{$node['HTTP Request'].json.data.recommendation}}",
  "upsell": "={{$node['HTTP Request'].json.data.suggestedUpsell}}"
}
```

## 3. Connect the coffee app chat route to n8n

Set this environment variable for the backend:

```bash
N8N_CHAT_WEBHOOK_URL=http://localhost:5678/webhook-test/coffee-demo
```

Then the existing backend route:

```text
POST /api/v1/chat/
```

will forward the user message to n8n.

Suggested request body:

```json
{
  "message": "Recommend me an iced coffee"
}
```

If you want the chat route to send richer structured data later, you can expand it to send `customerName`, `temperature`, `mood`, and `category` directly.

## 4. Test the workflow in n8n

1. Open the workflow in n8n.
2. Click `Listen for test event` on the `Webhook` node.
3. Send a request from Postman, curl, or the coffee app backend.
4. Confirm the `HTTP Request` node returns the mock recommendation.
5. Confirm the `MongoDB` node inserts a row into `workflow_logs`.
6. Confirm `Respond to Webhook` returns the final recommendation JSON.

Example curl request to n8n:

```bash
curl -X POST http://localhost:5678/webhook-test/coffee-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Alex",
    "mood": "needs energy",
    "temperature": "iced",
    "category": "coffee"
  }'
```

If you want to run a real Jest integration test against the live n8n webhook, use:

```bash
cd backend
RUN_N8N_WEBHOOK_TEST=true \
N8N_TEST_WEBHOOK_URL=http://localhost:5678/webhook-test/coffee-demo \
npx jest tests/n8nWebhook.integration.test.ts --runInBand --watchman=false
```

This test only runs when `RUN_N8N_WEBHOOK_TEST=true`, so your normal test suite stays fast and does not depend on n8n being online.

## 5. Demo flow to show in class or interview

1. User sends a recommendation request.
2. n8n webhook receives it.
3. `Set` normalizes the payload.
4. `HTTP Request` calls the coffee app internal API.
5. `MongoDB` logs the run.
6. `Respond to Webhook` returns the recommendation.

That demonstrates:

- internal API integration
- orchestration with n8n
- persistence/auditing with MongoDB
- a workflow that is more realistic than a basic single-node AI demo
