# WhatsApp Cloud API Webhook – തുടക്ക ഫയലുകൾ

ഈ backend Meta-യുടെ Callback URL verification സ്വീകരിക്കുകയും WhatsApp webhook events log ചെയ്യുകയും ചെയ്യും. ഇത് ഇപ്പോൾ ഓട്ടോമാറ്റിക് reply അയയ്ക്കുന്നില്ല; അതിന് അടുത്ത ഘട്ടത്തിൽ message-sending logic ചേർക്കണം.

## 1. GitHub-ലേക്ക് upload ചെയ്യുക
1. GitHub-ൽ പുതിയ repository ഉണ്ടാക്കുക (ഉദാ. `whatsapp-webhook`).
2. ഈ ZIP extract ചെയ്ത് ഉള്ളിലെ `server.js`, `package.json`, `.gitignore`, `README_ML.md` ഫയലുകൾ repository-ലേക്ക് upload ചെയ്യുക.
3. `node_modules` upload ചെയ്യരുത്.

## 2. Render-ൽ deploy ചെയ്യുക
1. https://render.com തുറന്ന് sign in ചെയ്യുക.
2. New + → Web Service തിരഞ്ഞെടുക്കുക.
3. നിങ്ങളുടെ GitHub repository connect ചെയ്യുക.
4. Runtime: Node തിരഞ്ഞെടുക്കുക.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Free plan തിരഞ്ഞെടുക്കുക (പരീക്ഷണത്തിന്). Create Web Service അമർത്തുക.
8. Deploy പൂർത്തിയായാൽ ലഭിക്കുന്ന URL കുറിച്ചുവയ്ക്കുക. ഉദാ. `https://your-service.onrender.com`

## 3. Verify Token ചേർക്കുക
Render service → Environment → Add Environment Variable:
- Key: `VERIFY_TOKEN`
- Value: നിങ്ങൾ സ്വയം സൃഷ്ടിക്കുന്ന രഹസ്യ string. ഉദാഹരണത്തിന് `AIEdgeVerify_7K9m2Pq4` (ഇത് തന്നെ ഉപയോഗിക്കേണ്ടതില്ല; സ്വന്തമായി ഒരു value സൃഷ്ടിക്കാം).

Save/Deploy ചെയ്യുക.

## 4. Meta Webhooks-ൽ നൽകുക
Meta App → WhatsApp → Configuration / Webhooks:
- Callback URL: `https://YOUR-SERVICE.onrender.com/webhook`
- Verify token: Render-ൽ `VERIFY_TOKEN` ആയി നൽകിയ അതേ value
- Verify and save അമർത്തുക.
- WhatsApp webhook fields-ൽ `messages` subscribe ചെയ്യുക.

`YOUR-SERVICE` എന്നത് Render നൽകിയ യഥാർത്ഥ service URL ഉപയോഗിച്ച് മാറ്റണം.

## സുരക്ഷ
- WhatsApp access token, app secret, OTP എന്നിവ GitHub-ലോ ഇവിടെ chat-ലോ ഇടരുത്.
- Free hosting idle ആയാൽ ഉറങ്ങുകയും വീണ്ടും ഉണരാൻ കുറച്ച് സമയം എടുക്കുകയും ചെയ്യാം; അതിനാൽ ഇത് പരീക്ഷണത്തിനാണ്. Render free services-ന് പരിധികളുണ്ട്.
- ഈ starter backend event-ുകൾ സ്വീകരിച്ച് log ചെയ്യുന്നതു മാത്രമാണ്. Auto-reply അല്ലെങ്കിൽ AI Signal Edge BUY/SELL alert അയയ്ക്കാൻ അധിക code, WhatsApp access token, recipient opt-in, template/policy setup എന്നിവ ആവശ്യമാണ്.
