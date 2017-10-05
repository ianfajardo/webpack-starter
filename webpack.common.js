const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');  

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = [
	{
		target: 'web',
		entry: {
			app: './src/index.js',
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist/public')
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: extractSass.extract({
							use:[{
									loader: "css-loader" // translates CSS into CommonJS
							}, {
									loader: "sass-loader" // compiles Sass to CSS
							}],
							// use style-loader in development
							fallback: "style-loader"
					})
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
				{
					test: /\.jsx$/,
					include: /react/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react'],
							cacheDirectory: true
						}
					}
				}
			]
		},
		plugins: [
					extractSass,
					new CleanWebpackPlugin(['dist']),
					new HtmlWebpackPlugin({
						filename: 'index.html',
						template: './src/index.ejs'
					})
		]
	},
	{
		target: 'node',
		entry: {
			server: './server.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/server')
		},
	}
];	