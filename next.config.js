/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        'rc-util',
        '@ant-design',
        'antd',
        'rc-pagination',
        'rc-picker',
        '@babel',
    ],
}

module.exports = nextConfig

