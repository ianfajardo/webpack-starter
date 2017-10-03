const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');  

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
		app: './src/index.js'
	},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
			}
		]
  },
	plugins: [
				extractSass,
				new CleanWebpackPlugin(['dist']),
				new HtmlWebpackPlugin({
					title: 'Output Management'
				})
	]
};	