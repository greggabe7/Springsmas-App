# Springsmas 2026

A Spring Break trip coordination app for 10 friends to find the perfect weekend. Features a beautiful Palm Springs sunset theme with pool-styled containers and real-time sync across all browsers.

## Features

- **Click-to-Toggle Grid**: Click cells to cycle through Yes / Maybe / No / Not Set
- **Scoring System**: Yes = 2 pts, Maybe = 1 pt — weekends ranked automatically
- **Top 3 Leaderboard**: Best weekends displayed with gold/silver/bronze podium
- **Real-Time Sync**: All browsers update instantly via Firebase (no refresh needed)
- **No Data Loss**: Atomic per-cell writes — clicking one cell never overwrites another
- **Palm Springs Theme**: Desert gradient sky, mountain silhouettes, palm trees, and pool-styled containers

## Participants

GGabe, Korn, Cardo, JZ, H, Rob, Roy, Steve, Tim, Arya

## Weekend Options

March 7-9 through June 20-22 (16 weekends total)

## Tech Stack

- Static HTML/CSS/JS frontend (no build step)
- Firebase Realtime Database (accessed directly from browser)
- Netlify for hosting
- Google Fonts (Pacifico, Poppins)

## Deployment

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Realtime Database and set rules to allow read/write
3. Add a web app and copy the config into `public/index.html`
4. Deploy to Netlify — connect this GitHub repo and set publish directory to `public`

## Local Development

Just open `public/index.html` in a browser. The Firebase connection works directly from the file — no local server needed.
