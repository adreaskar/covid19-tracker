/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'disease.sh',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
