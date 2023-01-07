/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      protocol: "https",
      hostname: "avatars.dicebear.com",
      port: ""
    }, {
      protocol: "https",
      hostname: "herokuapp.com",
      port: ""
    }],
  },

}

module.exports = nextConfig
