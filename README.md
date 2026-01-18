# PULSEWIRE - News Portal

A modern, minimalist news portal that fetches real-time news from NewsAPI.

## Live Demo

Open `https://pulsewirenews.netlify.app/#`

## Features

- Real-time news from multiple categories
- Clean, professional design
- Sort by date or title
- Responsive layout
- Today's Pick feature

## How It Works

1. **Page loads** → Fetches news categories and displays them
2. **Click a category** → Fetches news articles for that category
3. **News cards appear** → Shows title, image, source, and date
4. **Click arrow button** → Opens full article on original website
5. **Use filters** → Sort by date/title or get random picks

## API Used

**NewsAPI.org** - Free tier for development

### Endpoints

| Action | URL |
|--------|-----|
| Top Headlines | `https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={key}` |

### Categories Available

- General
- Business
- Technology
- Science
- Health
- Sports
- Entertainment

### API Response Format

```json
{
  "status": "ok",
  "totalResults": 20,
  "articles": [
    {
      "source": { "name": "CNN" },
      "title": "Article Title",
      "description": "Short description...",
      "url": "https://...",
      "urlToImage": "https://...",
      "publishedAt": "2026-01-18T10:00:00Z"
    }
  ]
}
```

## Setup

1. Get free API key from [newsapi.org](https://newsapi.org)
2. Open `scripts/news-portal.js`
3. Replace `API_KEY` with your key
4. Run with local server:
   ```
   python -m http.server 5500
   ```
5. Open `http://localhost:5500`

## Files

```
├── index.html          # Main HTML page
├── styles/style.css    # All styling
├── scripts/news-portal.js  # API calls & logic
└── README.md           # This file
```

## Tech Stack

- HTML5
- CSS3 (Custom properties)
- JavaScript (Fetch API)
- Bootstrap 5
- Font Awesome Icons
