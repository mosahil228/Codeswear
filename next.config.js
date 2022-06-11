/** @type {import('next').NextConfig} */
const nextConfig = {
  xperimental: {
    externalDir: true
  },
  // Potential new config flag:
  disableExperimentalFeaturesWarning: true,
  reactStrictMode: true,
}

module.exports = nextConfig
