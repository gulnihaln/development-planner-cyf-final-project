const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const common = require("./common.config");

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		historyApiFallback: true,
		port: 3000,
		proxy: {
			"/api": "http://localhost:3100",
		},
	},
	mode: "development",
	plugins: [
		new Dotenv({
			path: './.env.local'
		}),
	]
});
