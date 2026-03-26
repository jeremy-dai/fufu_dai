# CLAUDE.md

## Project Overview

Personal portfolio website built with Next.js. Includes blog, projects, and internationalization (zh/en).

## Blog Posts

- **Location:** `content/blog/` as `.mdx` files
- **Frontmatter fields:**
  - `title` (string, required)
  - `description` (string, required) — used for SEO/excerpt
  - `date` (string, required) — format `YYYY-MM-DD`
  - `tags` (string array, required) — valid values: `AI`, `LLM`, `Agent`, `RAG`, `Engineering`, `Career`, `Productivity`, `Marketing`
  - `lang` (string, required) — `"en"` or `"zh"`
  - `published` (boolean) — defaults to `true`
  - `image` (string, optional) — featured image path
- **Naming:** `slug-name.mdx` for Chinese, `slug-name-en.mdx` for English
- **Content format:** MDX with GitHub Flavored Markdown. Supports code blocks (syntax highlighted with `github-dark` theme), headings (H2/H3 used for sidebar table of contents), and standard markdown formatting.
- **Every post needs two versions:** `slug.mdx` (Chinese) and `slug-en.mdx` (English). Always create both.
- **Chinese version:** User provides the full content. Structure it with H2/H3 headings for readability and TOC navigation. Keep the original voice — do not rewrite or embellish.
- **English version:** Not a translation. Rewrite the same ideas in natural English as if written by a native speaker. Match the tone and structure but let the phrasing be idiomatic. Title and description should also be independently written, not translated.
