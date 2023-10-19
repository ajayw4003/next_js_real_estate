/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["bayut-production.s3.eu-central-1.amazonaws.com"]  // for working of image when using next js Image tag need to configure in next js
    }
}

module.exports = nextConfig
