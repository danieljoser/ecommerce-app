/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/ecommerce-app',
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com"],
        remotePatterns: [{
            protocol: 'https',
            hostname: "lh3.googleusercontent.com",
            port: '',
            pathname: '/*/**'
        }],
        remotePatterns: [{
            protocol: 'https',
            hostname: "fakestoreapi.com",
            port: '',
        }]
   },
   experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  }, 
}
      


export default nextConfig;