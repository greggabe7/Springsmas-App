# Springsmas 2026 App

## What It Does
Group availability tracker for planning a Springsmas trip. Users click cells to mark their availability (Yes/Maybe/No) for different weekends, and the app scores and ranks the best weekends based on group availability.

## Participants
Current list: GGabe, Korn, Cardo, JZ, H, Rob, Roy, Steve, Tim, Arya

To add a new participant, edit `public/index.html` and find:
```javascript
const PARTICIPANTS = ['GGabe', 'Korn', ...];
```

## Architecture
- **Frontend**: Static HTML with vanilla JavaScript (`public/index.html`)
- **Data Storage**: Firebase Realtime Database (accessed directly from browser)
- **Hosting**: Netlify (static site, no server needed)
- **Real-time sync**: Firebase `onValue()` listener updates all browsers instantly
- **Atomic writes**: Each cell click writes only that cell via `db.ref('availability/Person/Weekend').set()`

## Firebase Data Structure
```
availability/
  GGabe/
    "March 7-9": "yes"
    "April 4-6": "maybe"
  Korn/
    "March 14-16": "yes"
```

## Deployment
1. Create a Firebase project at console.firebase.google.com
2. Enable Realtime Database with permissive rules for the trusted group
3. Copy Firebase config into `public/index.html` (replace the YOUR_* placeholders)
4. Deploy to Netlify pointing at the `public/` directory

## Firebase Security Rules (permissive for trusted group)
```json
{
  "rules": {
    "availability": {
      ".read": true,
      ".write": true
    }
  }
}
```

## Owner Preferences
- Prefers Netlify + Firebase for simple apps (no heavy computation, minimal security needs)
