import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    async rewrites() {
        return [
            {
                source: '/admin/:path*',
                destination: 'https://yoga-fusion-w3cqn.ondigitalocean.app/:path*', // External Strapi URL
            },
        ];
    },
};

export default nextConfig;
