const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  'three',
  'react-spring',
  '@react-spring/three',
  '@react-spring/web',
  '@react-three/fiber',
  '@react-three/postprocessing',
  '@react-three/drei',
])

const nextTranslate = require('next-translate')

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts', 'context'],
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      exclude: /node_modules/,
      use: ['file-loader'],
    })

    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    })

    return config
  },
}

module.exports = withPlugins([nextTranslate, [withBundleAnalyzer], [withTM]], nextConfig)
