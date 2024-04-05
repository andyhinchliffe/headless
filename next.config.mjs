/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'headless.x10.mx',
                port: '',
                // pathname: '/wp/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;


