# Portfolio (M. Vishal Kumar)

This is a static portfolio site. Use one of the following options to publish a single public link for your portfolio.

Common hosting options

- **GitHub Pages (free)** — ideal for simple static sites. You can use `https://<username>.github.io/<repo>` or set a custom domain.
- **Netlify / Vercel (free tiers)** — automatic deploys from Git, supports custom domains and HTTPS.

Quick GitHub Pages publish (commands)

1. Rename your resume file to `resume.pdf` and place it next to `index.html`.
2. Initialize git, commit and push to a new GitHub repo:

```bash
git init
git add .
git commit -m "Initial portfolio"
# create an empty repo on GitHub named e.g. vishal-portfolio, then:
git remote add origin https://github.com/<your-username>/<repo>.git
git branch -M main
git push -u origin main
```

3. In the repository settings on GitHub -> Pages, select the `main` branch (root) and save. Your site will be available at `https://<your-username>.github.io/<repo>/`.

To use a custom domain (example `www.vishalportfolio.com`), add a `CNAME` file with your domain and configure DNS A/CNAME records at your registrar. See `CNAME` in this folder.

Netlify quick deploy

- Drag and drop the site folder to Netlify Drop (https://app.netlify.com/drop) or connect your GitHub repo on Netlify for automatic deploys.
- Netlify will provide a default subdomain (e.g. `cool-name.netlify.app`) or let you add a custom domain.

Notes

- Serving files over HTTP (for example via `python -m http.server`) is useful for local testing and ensures mobile devices open PDFs correctly.
- If `resume.pdf` still shows "We can't open this file", try opening it directly from File Explorer — if it fails, re-export the PDF from your source document.

If you'd like, I can add a small `download` link next to the view button, create a GitHub repo (you'll need to provide access/token), or set up a Netlify deploy configuration.
