import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vivancedata.com';

  // Static routes
  const routes = [
    '',
    '/about',
    '/career',
    '/case-studies',
    '/contact',
    '/blog',
    '/industries',
    '/industries/financial-services',
    '/innovation-hub',
    '/privacy-policy',
    '/responsible-ai',
    '/services',
    '/services/consulting',
    '/services/generative-ai',
    '/services/training',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts - you can dynamically fetch these if needed
  const blogPosts = [
    '/blog/ai-ethics-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
