import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';
import path from 'node:path';
import { createRequire } from 'node:module';

/**
 * Turbopack refuses to compile files outside its root, so the root has to
 * contain the resolved `next` package. In the npm workspace `next` is hoisted
 * to the repo root; in a standalone deploy it sits in this project. Deriving
 * the root from where `next` actually resolves is correct in both cases --
 * hardcoding either one breaks the other.
 */
const turbopackRoot = path.resolve(
  path.dirname(createRequire(import.meta.url).resolve('next/package.json')),
  '..',
  '..'
);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: turbopackRoot,
  },

  // Enable image optimization with aggressive caching
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },

  transpilePackages: ["@vivancedata/ui"],

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure compiler options for better performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Enable experimental features for performance
  experimental: {
    // Enable scroll restoration
    scrollRestoration: true,
    inlineCss: true,
    // Optimize package imports for smaller bundles
    // '@vivancedata/ui' matters most here: the design system is a barrel of
    // ~40 components imported at layout level, and without this hint its
    // unused members (measured: cmdk on 140 of 288 routes) ride into every
    // client bundle.
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
      '@vivancedata/ui',
    ],
  },

  // Enable gzip compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Power optimizations
  poweredByHeader: false,

  /**
   * Vercel's skew protection stamps every asset URL with `?dpl=<deployment
   * id>`, and next/font bakes that query into the `@font-face` rules it emits.
   * Those rules are the output of a webpack loader, and Next keys its
   * persistent webpack cache on the Next version plus a subset of this config
   * that does not include the deployment id. Vercel restores `.next/cache`
   * between builds, so from the second deploy on, the CSS names the fonts of
   * an earlier deployment while the `<link rel="preload">` tags name the
   * current one. Measured on production: three deployment ids in one
   * document, every preload unused, and all four fonts fetched twice.
   *
   * Reproduced locally with `NOW_BUILDER=1 NEXT_DEPLOYMENT_ID=a npm run build`
   * followed by the same with `b`: the second build's CSS still said `a`.
   *
   * Folding the id into the cache version invalidates the cache exactly when
   * the id changes -- once per deploy -- which is the only time the baked
   * URLs go stale. Local builds have no id and keep their cache.
   */
  webpack(webpackConfig, { config }) {
    const deploymentId = config.deploymentId;
    if (deploymentId && webpackConfig.cache && typeof webpackConfig.cache === 'object') {
      webpackConfig.cache = {
        ...webpackConfig.cache,
        version: `${webpackConfig.cache.version}|${deploymentId}`,
      };
    }
    return webpackConfig;
  },

  /**
   * The five enterprise verticals the site used to carry. Their pages are gone,
   * but the URLs are indexed, so they redirect to the industries hub rather than
   * 404. Permanent (308) because the pages are not coming back.
   */
  async redirects() {
    return [
      'financial-services',
      'healthcare',
      'retail',
      'energy',
      'public-sector',
    ].map((slug) => ({
      source: `/industries/${slug}`,
      destination: '/industries',
      permanent: true,
    }));
  },

  // Configure headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000',
          },
        ],
      },
    ];
  },
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

// Build configuration with optional Sentry and Bundle Analyzer
let config = nextConfig;

// Wrap with Sentry if configured
if (process.env.SENTRY_DSN) {
  config = withSentryConfig(config, sentryWebpackPluginOptions);
}

// Wrap with Bundle Analyzer
config = withBundleAnalyzer(config);

export default config;
