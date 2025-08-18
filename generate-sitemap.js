// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'http://amazepuzzles.com' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  
  sitemap.pipe(writeStream);

  // Add your routes here
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'daily', priority: 0.8 });
  sitemap.write({ url: '/products', changefreq: 'daily', priority: 0.8 });
  sitemap.write({ url: '/contact', changefreq: 'daily', priority: 0.8 });
  // Add more routes as needed

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('Sitemap generated!');
})();
