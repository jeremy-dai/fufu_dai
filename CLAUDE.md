# CLAUDE.md

## Project Overview

Personal website (`fufu.dev`) built with Next.js, covering bilingual (`zh`/`en`) essays and projects.

## Design

Information hierarchy and visual style follow [`jeremy-info-design`](~/.gemini/config/skills/jeremy-info-design/SKILL.md) and [`jeremy-visual-style`](~/.gemini/config/skills/jeremy-visual-style/SKILL.md). Only rules specific to this repository are listed below:

- **Layout & color:** Every page uses the full `1440px` shell with uneven bento rows (`8·4`, `7·5`, `9·3`). Where a screen's content supports them, cream, one lime card (the main point) and one orange card (a short statement) show up as whole cards—never pull a conversational joke or sentence out of narrative prose onto a standalone orange card out of context; the single `.jd-glow` card holds one number. A project's headline number sits inside that project's own card, never in a separate card. Long prose (MDX posts, the About story, project case studies) sits directly on the `#1A1915` canvas beside the cards, never inside one.
- **Heading scale & bilingual typography (`zh`/`en`):** Card hero titles use `.jd-h1` (`44–72px`); the hero names the subject (e.g. the person on About), not a bare section label. Short 2–4 word titles use `.jd-serif` (`Fraunces` + `Noto Serif SC`); full-sentence headlines—including all blog post titles, quotes, and MDX subheadings—stay in the sans stack (`Outfit` + `Noto Sans SC`). `JetBrains Mono` is reserved for code in MDX.
- **Responsive public layout:** Unlike fixed-width 1440px static artifacts that zoom-scale (`data-fit`), `.jd-grid` uses 12 columns at `>=960px` inside a `1440px` shell and collapses cards cleanly to a single column on narrow phone screens without horizontal scroll.
- **Token hygiene:** All theme CSS custom properties in `app/globals.css` carry the `--jd-` prefix, with surface-scoped contrast variables (`--jd-m`, `--jd-l`, `--jd-fill`, `--jd-on-fill`, `--jd-hi`) re-declared on `.jd-dark`/`.jd-glow`, `.jd-cream`/`.jd-cream2`/`.jd-lime`, and `.jd-orange`.

## Blog Posts

> When asked to write or create a blog post, follow all rules in this section exactly before generating any content.

- **Location:** `content/blog/` as `.mdx` files
- **Frontmatter fields:**
  - `title` (string, required)
  - `description` (string, required) — used for SEO/excerpt
  - `date` (string, required) — format `YYYY-MM-DD`, **must be quoted** (e.g. `date: "2026-03-31"`). Unquoted ISO dates are parsed by YAML as Date objects, which breaks sort order on the blog listing page.
  - `tags` (string array, required) — valid values: `AI`, `LLM`, `Agent`, `RAG`, `Engineering`, `Career`, `Productivity`, `Marketing`
  - `lang` (string, required) — `"en"` or `"zh"`
  - `published` (boolean) — defaults to `true`
  - `image` (string, optional) — featured image path
- **Naming:** `slug-name.mdx` for Chinese, `slug-name-en.mdx` for English
- **Content format:** MDX with GitHub Flavored Markdown. Supports code blocks (syntax highlighted with `github-dark` theme), headings (H2/H3 used for sidebar table of contents), and standard markdown formatting.
- **Every post needs two versions:** `slug.mdx` (Chinese) and `slug-en.mdx` (English). Always create both.
- **Chinese version:** User provides the full content. Structure it with H2/H3 headings for readability and TOC navigation. Keep the original voice — do not rewrite or embellish.
- **English version:** Not a translation. Rewrite the same ideas in natural English as if written by a native speaker. Match the tone and structure but let the phrasing be idiomatic. Title and description should also be independently written, not translated.

## Projects

- **Location:** `content/projects/` as `.mdx` files — one file per project, no body content (frontmatter only)
- **Naming:** `slug-name.mdx` — the filename becomes the URL slug (`/projects/slug-name`)
- **Frontmatter fields:**
  - `title` (string, required)
  - `title_zh` (string, optional)
  - `subtitle` (string, required) — one-line descriptor
  - `subtitle_zh` (string, optional)
  - `description` (string, required) — used for SEO/card excerpt
  - `description_zh` (string, optional)
  - `tags` (string array, required) — free-form tech/domain tags, e.g. `[LangGraph, RAG, Next.js]`
  - `status` (string, required) — e.g. `"Production · KAWO"` or `"Live · Side Project"`
  - `status_zh` (string, optional)
  - `order` (number, required) — controls display order on the projects page (ascending)
  - `stack` (string, optional) — tech stack as a `·`-separated string
  - `problem` (string, optional) — the problem context
  - `problem_zh` (string, optional)
  - `solution` (string, optional) — what was built
  - `solution_zh` (string, optional)
  - `impact` (string array, optional) — bullet points of outcomes
  - `impact_zh` (string array, optional)
  - `role` (string, optional) — personal contribution
  - `role_zh` (string, optional)
  - `links` (array of `{label, url}`, optional) — external links shown on detail page
- **No body content** — leave the MDX body empty; all content lives in frontmatter.
- **Use YAML block scalars** (`>-`) for multi-sentence prose fields to keep the file readable.
