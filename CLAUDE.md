# Springsmas 2026 App

## What It Does
Group availability tracker for planning a Springsmas trip. Users click cells to mark their availability (Yes/Maybe/No) for different weekends, and the app scores and ranks the best weekends based on group availability.

## Participants
Current list: GGabe, Korn, Cardo, JZ, H, Rob, Roy, Steve, Tim, Arya

To add a new participant, edit `public/index.html` line ~550:
```javascript
const PARTICIPANTS = ['GGabe', 'Korn', ...];
```

## Architecture
- **Frontend**: Static HTML with vanilla JavaScript (`public/index.html`)
- **Backend**: Node.js/Express server (`index.js`) - acts as a proxy to JSONBin.io
- **Data Storage**: JSONBin.io (requires API key and Bin ID as environment variables)
- **Hosting**: Render or Replit (requires Node.js runtime)

## Deployment
- **GitHub Repo**: https://github.com/greggabe7/Springsmas-App
- **Environment Variables Needed**:
  - `JSONBIN_API_KEY` - Your JSONBin.io master key
  - `JSONBIN_BIN_ID` - Your bin ID from JSONBin.io

## Future Consideration
This app could be simplified to static HTML + Firebase + Netlify (no server needed). The current server only proxies requests to JSONBin and could be eliminated by using Firebase directly from the browser.

## Owner Preferences
- Prefers Netlify + Firebase for simple apps (no heavy computation, minimal security needs)
- When starting new projects, weigh pros/cons of serverless vs server-based approaches
