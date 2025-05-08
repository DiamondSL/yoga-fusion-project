import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config) {
        // Handle raw SVG imports
        config.module.rules.push({
            test: /\.svg\?raw$/,
            type: 'asset/source',
        });
        // Handle SVGs with @svgr (excluding ?raw)
        config.module.rules.push({
            test: /\.svg$/,
            exclude: /\.svg\?raw$/,
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
                destination: 'https://yoga-fusion-w3cqn.ondigitalocean.app/:path*',
            },
        ];
    },
};

export default nextConfig;