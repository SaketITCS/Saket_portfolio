# Saket Maheshwari: React research website
Vite + React, no animation libraries (pure CSS + canvas + IntersectionObserver).
- `npm install` then `npm run dev` (live preview) or `npm run build` (output in `dist/`).
- Hostinger: upload the **contents of `dist/`** to `public_html`.
- All content lives in `src/data.js`: SOCIALS, STATS, PROJECTS, PUBLICATIONS, TIMELINE, SKILLS, SIGNALS, MAINT, BIO and BLOG (blog posts are plain text blocks there).
- New sections: `Signals.jsx` (Signals Lab), `Biomedical.jsx`, `Maintenance.jsx`, `Blog.jsx`; shared helpers in `ui.jsx`; their styles in `extra.css`. Profile photo: `public/assets/images/profile/profile.jpg`. CV: `public/assets/documents/cv.pdf` (now your latest resume).
- Project images: put files in `public/assets/images/projects/` and set `img:"assets/images/projects/x.png"`.
