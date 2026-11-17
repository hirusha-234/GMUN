GMUN PRODUCTION WEBSITE PACKAGE
================================

This package contains the current website source files, with development
scripts, Git metadata, and backup files excluded.

BEFORE DEPLOYING:
1. Copy your complete existing assets folder into this folder, replacing the
   empty assets directory. The uploaded source bundle did not include the
   actual assets directory, so photographs, logos, council images and event
   photos are NOT embedded in this ZIP.
2. Confirm that the filenames referenced by index.html and data.js exist
   under assets/ (including assets/exco-2025-*.jpg, assets/exco-2026-*.jpg,
   assets/councils/, assets/event-gallery/2025/, logo and favicon files).
3. Open index.html locally and test all images, year selectors, EXCO carousel,
   study-guide links and contact link.
4. Deploy this folder to Netlify. netlify.toml publishes this folder (.).

PUBLIC INFORMATION REMINDER:
- Everything in this deployed folder and assets/ is public. Do not put passwords,
  access tokens, private documents, unpublished personal information, or
  confidential files here.
- data.js contains committee Google Drive links. Ensure each linked document is
  intentionally shared for public viewing and contains no private information.
- EXCO names, roles and portraits are public. Confirm you have permission to
  publish the personal information and photographs.
- Any front-end login/demo is not security or access control. Never use it to
  protect confidential content.
- The contact form currently uses a mailto link; it opens the visitor's email
  app rather than securely storing/submitting messages on a server.

Included: index.html, styles.css, script.js, data.js, robots.txt,
sitemap.xml, netlify.toml.
Excluded: .git, PowerShell scripts, backups, local notes and development files.
