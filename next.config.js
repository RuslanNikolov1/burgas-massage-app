/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
  },
  // Enable optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  async headers() {
    return [
      {
        // Cache static assets (images, fonts, etc.)
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|mp3|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache API routes for shorter time
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300', // 5 minutes
          },
        ],
      },
      {
        // Apply headers to all routes
        source: '/(.*)',
        headers: [
          // Prevent iOS from auto-detecting phone numbers
          {
            key: 'format-detection',
            value: 'telephone=no',
          },
          // Security headers
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
        ],
      },
      {
        // Cache manifest and well-known files
        source: '/(site.webmanifest|robots.txt|sitemap.xml|.well-known/:path*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400', // 24 hours
          },
        ],
      },
      {
        // Apple App Site Association
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
  // Temporarily disabled redirects for testing
  // async redirects() {
  //   return [
  //     // Only redirect in production - exclude localhost and development domains
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: '(?!energymassagetherapy\\.com|localhost|127\\.0\\.0\\.1|.*\\.vercel\\.app|.*\\.netlify\\.app).*',
  //         },
  //       ],
  //       destination: 'https://energymassagetherapy.com/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
}

module.exports = nextConfig

