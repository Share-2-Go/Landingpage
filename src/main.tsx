
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Serve static SEO files that Figma Make hosting doesn't serve natively
  const path = window.location.pathname;

  if (path === '/sitemap.xml') {
    document.open('text/xml');
    document.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.share2go.it/</loc>
    <lastmod>2026-04-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    document.close();
  } else if (path === '/robots.txt') {
    document.open('text/plain');
    document.write(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://www.share2go.it/sitemap.xml`);
    document.close();
  } else if (path === '/google0548097cc5da4ec7.html') {
    document.open('text/html');
    document.write('google-site-verification: google0548097cc5da4ec7.html');
    document.close();
  } else {
    createRoot(document.getElementById("root")!).render(<App />);
  }
