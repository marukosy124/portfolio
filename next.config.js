const plugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const path = require("path")

const nextConfig = {
  output: "standalone",
  images: {
    loader: "akamai",
    path: "/",
  },
  env: {
    EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    EMAILJS_API_KEY: process.env.NEXT_PUBLIC_EMAILJS_API_KEY,
  },
  webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    })

    return config
  },
}

module.exports = async (phase) =>
  plugins(
    [
      [
        {
          sassOptions: {
            includePaths: [path.join(__dirname, "styles")],
            prependData: `@import "@styles/variables.module.scss";`,
          },
          async rewrites() {
            return [
              {
                source: "/service-worker.js",
                destination: "/_next/static/service-worker.js",
              },
            ]
          },
        },
      ],
      withBundleAnalyzer,
    ],
    nextConfig
  )(phase, { undefined })
