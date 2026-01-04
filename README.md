# Markdown Viewer

A research document for building a markdown viewer deployable on Vercel.

## Research Summary

### Recommended Stack

For viewing complex scientific/technical markdown with tables, headers, and rich formatting:

```
next.js          - React framework
react-markdown   - Markdown renderer
remark-gfm       - GitHub Flavored Markdown (tables, strikethrough, task lists)
react-syntax-highlighter - Code block highlighting (optional)
tailwindcss      - Styling
@tailwindcss/typography - Beautiful prose styling
```

---

## Options Analyzed

### Option 1: Build from Scratch (Most Control)

**Core Libraries:**
- [`react-markdown`](https://github.com/remarkjs/react-markdown) - Safe markdown renderer for React
- [`remark-gfm`](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown plugin
- [`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code highlighting

**Pros:** Full control, minimal bundle size (~15kb), exact styling
**Cons:** More setup work

---

### Option 2: Vercel Blog Starter (Quick Start) ⭐ Recommended

**Source:** [vercel/next.js/examples/blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)

**Uses:** gray-matter + remark + remark-html + Tailwind CSS

**Pros:** Official Vercel template, one-click deploy, proven architecture
**Cons:** Designed for blogs, needs adaptation for viewer-only use

---

### Option 3: Tailwind Next.js Starter Blog (Feature-Rich)

**Source:** [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

**Features:**
- MDX support (JSX in markdown)
- KaTeX for math equations
- Server-side syntax highlighting via rehype-prism-plus
- Light/dark theme
- Near-perfect Lighthouse score (85kb first load)

**Pros:** Most feature-complete, production-ready
**Cons:** May be overkill for simple viewer

---

### Option 4: Vercel Streamdown (AI-Optimized)

**Source:** [vercel/streamdown](https://github.com/vercel/streamdown)

New from Vercel - designed for AI streaming responses but works for any markdown.

**Pros:** Handles edge cases well, actively maintained by Vercel
**Cons:** Newer, less community examples

---

## Supported Markdown Features

All these are supported by react-markdown + remark-gfm:

| Feature | Support |
|---------|---------|
| Multiple heading levels (H1-H6) | ✅ |
| Tables with alignment | ✅ |
| Bold/italic text | ✅ |
| Horizontal rules | ✅ |
| Ordered/unordered lists | ✅ |
| Code blocks with syntax highlighting | ✅ |
| Block quotes | ✅ |
| Task lists | ✅ |
| Strikethrough | ✅ |
| Unicode characters (★★★★★) | ✅ |

---

## Quick Implementation Example

```jsx
// components/MarkdownViewer.jsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownViewer({ content }) {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
```

---

## Recommended Implementation Steps

1. **Create Next.js app:**
   ```bash
   npx create-next-app@latest markdown-viewer --typescript --tailwind --app
   ```

2. **Install dependencies:**
   ```bash
   npm install react-markdown remark-gfm @tailwindcss/typography
   ```

3. **Configure Tailwind** (add typography plugin to `tailwind.config.js`):
   ```js
   plugins: [require('@tailwindcss/typography')]
   ```

4. **Create viewer component** with the example above

5. **Deploy to Vercel:**
   ```bash
   vercel
   ```

---

## Package.json Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Sources

- [react-markdown - GitHub](https://github.com/remarkjs/react-markdown)
- [remark-gfm - GitHub](https://github.com/remarkjs/remark-gfm)
- [Vercel Blog Starter Kit](https://vercel.com/templates/next.js/blog-starter-kit)
- [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)
- [Vercel Streamdown](https://github.com/vercel/streamdown)
- [MDXEditor](https://mdxeditor.dev/)
- [Next.js Markdown Rendering Docs](https://nextjs.org/learn/pages-router/dynamic-routes-render-markdown)
- [React Markdown Tables Guide](https://dev.to/letsbsocial1/how-to-add-tables-to-react-markdown-21lc)
- [Strapi React Markdown Guide 2025](https://strapi.io/blog/react-markdown-complete-guide-security-styling)
