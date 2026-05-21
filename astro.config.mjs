import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.k-1custom.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    tailwind(),
    sitemap({
      lastmod: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  image: {
    responsiveStyles: true,
  },
  vite: {
    build: { cssCodeSplit: true },
  },
});
