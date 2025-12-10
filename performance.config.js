// Performance configuration for massage app
const performanceConfig = {
  // Cache strategies
  cache: {
    // Static assets (images, fonts, etc.) - 1 year
    static: 'public, max-age=31536000, immutable',
    
    // API routes - 5 minutes
    api: 'public, max-age=300, s-maxage=300',
    
    // HTML pages - 1 hour
    pages: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    
    // Manifest and robots - 1 day
    seo: 'public, max-age=86400, s-maxage=86400',
    
    // No cache for admin/auth
    noCache: 'no-store, no-cache, must-revalidate, max-age=0',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Bundle optimization
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  // Critical assets to preload
  preload: [
    '/bed.png',
    '/bed-1.png', 
    '/bed-2.png',
  ],

  // External domains to prefetch
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
}

module.exports = performanceConfig