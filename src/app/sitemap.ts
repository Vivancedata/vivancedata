import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://vivancedata.com';

// Get all blog post slugs dynamically
function getBlogSlugs(): string[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    const slugs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const mdxPath = path.join(postsDirectory, entry.name, `${entry.name}.mdx`);
        const pageMdxPath = path.join(postsDirectory, entry.name, 'page.mdx');
        if (fs.existsSync(mdxPath) || fs.existsSync(pageMdxPath)) {
          slugs.push(entry.name);
        }
      } else if (entry.name.endsWith('.mdx')) {
        slugs.push(entry.name.replace(/\.mdx$/, ''));
      }
    }

    return slugs;
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();
  const currentDate = new Date();

  // Static routes with priorities
  const staticRoutes: { route: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    // Main pages
    { route: '', priority: 1.0, changeFreq: 'weekly' },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' },
    { route: '/contact', priority: 0.8, changeFreq: 'monthly' },
    { route: '/career', priority: 0.6, changeFreq: 'weekly' },

    // Services
    { route: '/services', priority: 0.9, changeFreq: 'monthly' },
    { route: '/services/generative-ai', priority: 0.8, changeFreq: 'monthly' },
    { route: '/services/consulting', priority: 0.8, changeFreq: 'monthly' },
    { route: '/services/training', priority: 0.8, changeFreq: 'monthly' },
    { route: '/methodology', priority: 0.8, changeFreq: 'monthly' },

    // Industries
    { route: '/industries', priority: 0.8, changeFreq: 'monthly' },
    { route: '/industries/financial-services', priority: 0.7, changeFreq: 'monthly' },

    // Case Studies
    { route: '/case-studies', priority: 0.8, changeFreq: 'weekly' },

    // Resources
    { route: '/resources', priority: 0.8, changeFreq: 'monthly' },

    // Blog
    { route: '/blog', priority: 0.9, changeFreq: 'daily' },

    // Tools
    { route: '/tools/roi-calculator', priority: 0.8, changeFreq: 'monthly' },
    { route: '/tools/ai-readiness', priority: 0.8, changeFreq: 'monthly' },
    { route: '/tools/use-cases', priority: 0.8, changeFreq: 'monthly' },

    // Other pages
    { route: '/innovation-hub', priority: 0.7, changeFreq: 'monthly' },
    { route: '/responsible-ai', priority: 0.7, changeFreq: 'monthly' },

    // Legal
    { route: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' },
    { route: '/terms-of-service', priority: 0.3, changeFreq: 'yearly' },
  ];

  const pages: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFreq }) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));

  // Blog posts (dynamically generated)
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...blogPages];
}
