# Springsmas 2026

A Spring Break trip coordination app for 9 friends to find the perfect weekend. Features a beautiful Palm Springs sunset theme with pool-styled containers.

## Features

- **User Selection**: Each participant selects their name from a dropdown
- **Availability Checkboxes**: Check which weekends work for you (16 options from March-June)
- **Live Results**: See group availability sorted by most popular weekends
- **Winner Display**: Top weekend(s) highlighted with availability count
- **Palm Springs Theme**: Desert gradient sky, mountain silhouettes, palm trees, and pool-styled containers

## Participants

Greg, Matt, Chris, Brian, Jeff, Mike, Dave, Steve, Tom

## Weekend Options

March 7-9 through June 20-22 (16 weekends total)

## Deployment to Replit

1. **Create a new Replit**
   - Go to [replit.com](https://replit.com) and create a new Repl
   - Choose "Node.js" as the template
   - Name it "springsmas-2026"

2. **Copy the files**
   - Copy `index.js` to the root of your Repl
   - Create a `public` folder in your Repl
   - Copy `public/index.html` into the `public` folder
   - Copy `package.json` to the root (or let Replit generate it and add the dependencies)

3. **Install dependencies**
   - Replit will automatically install dependencies when you run
   - Or manually run: `npm install`

4. **Run the app**
   - Click the "Run" button
   - Your app will be live at your Replit URL (e.g., `https://springsmas-2026.yourusername.repl.co`)

5. **Share the link**
   - Send the Replit URL to your friends
   - Everyone can select their name and mark their availability

## Local Development

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open http://localhost:3000
```

## API Endpoints

- `GET /api/availability` - Returns all availability data
- `POST /api/availability` - Save a user's selections
  - Body: `{ "name": "Greg", "weekends": ["March 7-9", "March 14-16"] }`
- `POST /api/reset` - Reset all data (for testing)

## Data Persistence

Uses Replit's built-in Key-Value Database with unwrap protection to prevent data corruption.

## Tech Stack

- Express.js server
- @replit/database for persistence
- Vanilla HTML/CSS/JS frontend
- Google Fonts (Pacifico, Poppins)
