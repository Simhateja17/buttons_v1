# 🚀 Quick Start - Testing Button Feature

## Prerequisites
- Node.js and pnpm installed
- n8n instance running (local or cloud)

## Step-by-Step Testing Guide

### 1️⃣ Build the Chat Package

```bash
# Navigate to the n8n repository
cd c:/Users/mg875/Desktop/n8n-chat-bot/n8n

# Install dependencies (if not already done)
pnpm install

# Build the chat package
pnpm build --filter @n8n/chat
```

✅ **Success:** You should see build output and files in `packages/frontend/@n8n/chat/dist/`

---

### 2️⃣ Set Up n8n Workflow

**Option A: Import the Example Workflow**
1. Open your n8n instance
2. Click **"Add Workflow"**
3. Click **"Import from File"**
4. Select `example-workflow-buttons.json`
5. **Activate** the workflow
6. Copy the webhook URL (it will be something like `http://localhost:5678/webhook/chat`)

**Option B: Create Manually**
1. Add **Webhook Trigger** node
2. Set path to `chat`
3. Add **Code** node with the button generation logic (see example-workflow-buttons.json)
4. Add **Respond to Webhook** node
5. Connect: Webhook → Code → Respond
6. Activate workflow

---

### 3️⃣ Configure Test HTML

1. Open `test-buttons.html` in a text editor
2. Find this line:
   ```javascript
   webhookUrl: 'http://localhost:5678/webhook/chat',
   ```
3. Replace with your actual webhook URL
4. Save the file

---

### 4️⃣ Run the Test

**Option A: Simple (just open file)**
```bash
# From packages/frontend/@n8n/chat/ directory
# Just open the file in a browser
start test-buttons.html   # Windows
# or
open test-buttons.html    # Mac
# or
xdg-open test-buttons.html # Linux
```

**Option B: Local Server (recommended)**
```bash
# Navigate to the chat package
cd packages/frontend/@n8n/chat

# Serve with Python
python -m http.server 8080

# Or with Node.js
npx serve -p 8080

# Then open: http://localhost:8080/test-buttons.html
```

---

### 5️⃣ Test the Buttons!

1. **Open the test page** - You should see the chat widget
2. **Type "hello"** or just wait for initial messages
3. **You should see buttons appear!** 🎉
4. **Click a button** - It should send the value back to n8n
5. **n8n responds with more buttons** - Test the multi-level flow

#### Expected Flow:
```
User: hello
Bot: Welcome! (with 4 department buttons)
User clicks: "Sales"
Bot: Do you have a customer number? (with Yes/No buttons)
User clicks: "No, I'm new"
Bot: What are you interested in? (with Products/Pricing/Demo buttons)
... and so on
```

---

### 6️⃣ Verify It's Working

**✅ Checklist:**
- [ ] Chat widget loads
- [ ] Buttons render with correct labels
- [ ] Buttons are clickable
- [ ] Clicking sends value to n8n (check browser DevTools Network tab)
- [ ] n8n workflow executes and responds
- [ ] Multi-level button flows work
- [ ] Buttons with URLs open links in new tabs
- [ ] Text without buttons displays normally

---

## 🐛 Troubleshooting

### Buttons don't appear?
- **Check browser console** (F12) for errors
- **Verify the build** completed: check `dist/` folder exists
- **Check button markup** in n8n response (Network tab)

### "Cannot find module" error?
- Path to `dist/chat.bundle.es.js` might be wrong
- Make sure you built the package: `pnpm build --filter @n8n/chat`

### Buttons appear as text?
- Check the markup format - must be exactly:
  ```
  ```buttons
  { "options": [...] }
  ```
  ```
- No extra spaces, proper JSON format

### Button clicks don't send messages?
- Check webhookUrl is correct
- Verify n8n workflow is **active**
- Check browser Network tab for failed requests
- Make sure n8n is accessible (CORS, firewall, etc.)

---

## 📊 Testing Scenarios

### Test 1: Basic Buttons
```
Bot sends:
```buttons
{"options": [{"label": "A", "value": "A"}, {"label": "B", "value": "B"}]}
```

Expected: 2 buttons appear, clicking sends "A" or "B"
```

### Test 2: Buttons with Title
```
Bot sends:
```buttons
{"title": "Choose:", "options": [...]}
```

Expected: Title appears above buttons
```

### Test 3: URL Buttons
```
Bot sends:
```buttons
{"options": [{"label": "Docs", "value": "DOCS", "url": "https://docs.n8n.io"}]}
```

Expected: Button opens URL in new tab AND sends "DOCS" to workflow
```

### Test 4: Streaming Mode
```javascript
// In test-buttons.html, change:
enableStreaming: true

Expected: Text streams in, buttons appear after streaming completes
```

---

## 📸 Demo Video Checklist

Record a video showing:
1. ✅ Opening test-buttons.html
2. ✅ Chat widget loading
3. ✅ Typing "hello" or automatic initial message
4. ✅ Buttons appearing
5. ✅ Clicking "Sales" button
6. ✅ Second set of buttons appearing
7. ✅ Clicking "No, I'm new"
8. ✅ Third set of buttons
9. ✅ Complete multi-level conversation flow
10. ✅ (Optional) Browser DevTools showing network requests

---

## 📦 Package for Daniel

Files to send:
- ✅ `BUTTON_FEATURE_GUIDE.md` (complete documentation)
- ✅ `TESTING_GUIDE.md` (this file)
- ✅ `test-buttons.html` (test page)
- ✅ `example-workflow-buttons.json` (n8n workflow)
- ✅ Demo video or screenshots
- ✅ Build instructions (in guide)

---

## 🎯 Success Criteria

You can tell Daniel the feature is complete when:
1. ✅ You can build the package without errors
2. ✅ Buttons render in the chat widget
3. ✅ Clicking buttons sends values to n8n
4. ✅ Multi-level conversation flows work
5. ✅ It works via CDN embed (no custom code needed)
6. ✅ Both streaming and non-streaming modes work
7. ✅ Documentation is complete

---

## 💰 Ready for Payment!

Once you've tested and confirmed everything works:
1. Send Daniel the demo video
2. Share all the files above
3. Walk him through testing on his setup
4. Collect your €130! 🎉

---

**Questions?** Check the main `BUTTON_FEATURE_GUIDE.md` for more details!
