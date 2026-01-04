# Markdown Viewer

A clean, fast markdown viewer with GitHub Flavored Markdown support. Built with Next.js and deployable to Vercel.

## Features

- GitHub Flavored Markdown (GFM) support
- Tables with proper styling
- Dark mode support (follows system preference)
- Edit mode to paste custom markdown
- Sample document included
- Responsive design

## Tech Stack

- **Next.js 16** - React framework
- **react-markdown** - Markdown renderer
- **remark-gfm** - GitHub Flavored Markdown plugin (tables, strikethrough, task lists)
- **Tailwind CSS** - Styling
- **@tailwindcss/typography** - Beautiful prose styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/polaires/markdown-viewer)

Or deploy manually:

```bash
npm install -g vercel
vercel
```

## Usage

1. Open the app
2. View the sample markdown or click "Edit" to paste your own
3. Click "Preview" to see rendered markdown
4. Click "Load Sample" to restore the example document

## Supported Markdown Features

| Feature | Support |
|---------|---------|
| Headings (H1-H6) | Yes |
| Tables | Yes |
| Bold/Italic | Yes |
| Lists | Yes |
| Code blocks | Yes |
| Block quotes | Yes |
| Horizontal rules | Yes |
| Task lists | Yes |
| Strikethrough | Yes |
| Unicode (stars, etc) | Yes |
