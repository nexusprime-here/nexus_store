/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "http2.mlstatic.com",
			},
		],
	},
};

module.exports = nextConfig;
