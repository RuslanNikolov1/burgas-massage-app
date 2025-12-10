/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
  },
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/(.*)',
        headers: [
          // Apple Universal Links headers
          {
            key: 'apple-app-site-association',
            value: 'application/json',
          },
          // Prevent iOS from auto-detecting phone numbers
          {
            key: 'format-detection',
            value: 'telephone=no',
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
  async redirects() {
    return [
      // Only redirect in production - exclude localhost and development domains
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?!energymassagetherapy\\.com|localhost|127\\.0\\.0\\.1|.*\\.vercel\\.app|.*\\.netlify\\.app).*',
          },
        ],
        destination: 'https://energymassagetherapy.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

