const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	webpack: (config, options) => {
		config.plugins.push(
			new CopyWebpackPlugin({
				patterns: [
					{
						from: "cert/*.p12",
						to: "static/",
					},
				],
			})
		);

		return config;
	},
};

module.exports = nextConfig;
