/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placeimg.com/640/480/any',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
