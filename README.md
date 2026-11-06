# DIJI website

Public companion directory at https://dijicomp.com/. Built with React, TypeScript and Vite.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
```

The production output is `dist/`. Browser checks should cover desktop, tablet and phone widths; every navigation destination; both companion dialogs; Escape and focus restoration; the mobile menu; background pause/play; and the contact email link.

## Content

- `src/data/companions.ts`: companion descriptions, availability and external website URLs. Only Bryan and Jesus are listed. Jesus is in development; add its purpose and URL once confirmed.
- `src/data/navigation.ts`: shared header/footer navigation and contact address.
- Companion cards open a native modal before the visitor follows a website link. No DIJI authentication or account storage is implemented. Bryan handles its own account access.
- Resources link to Bryan’s existing guides, beta access and privacy information. No newsletter signup or social account is implied.

## Existing hosting

The apex and `www` domains are routed through Cloudflare to Nginx on the existing host. The Nginx document root for these domains is `/var/www/diji`. This is separate from the Bryan backend deployment and the Bryan Cloudflare Pages site.

Build from a clean checkout and push the verified source before publishing. Upload the generated assets first, then replace `index.html` atomically. Preserve `/var/www/diji/legal`, other existing files and older hashed bundles so open browser sessions keep working. No Nginx or Bryan restart is needed for a static update. Verify the public HTML and assets match the release after publishing.
