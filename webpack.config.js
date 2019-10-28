const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');

const plugins = [new HtmlWebpackPlugin({
	template: 'client/index.html',
	filename: 'index.html',
	indexject: 'body'
})];

module.exports = (env) => {
	const environment = env || 'production';

	if (env === 'production') {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }

	return {
		mode: environment,
		entry: './client/index.js',
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: 'app.bundle.js'
		},
		
		optimization: {
			minimize: false
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
					}
				},
				{
					test: /\.css$/,
					use: [
						{ loader: 'style-loader'},
						{
							loader: 'css-loader',
							options: {
								modules: true
							}
						}
					]
				}
			]
		},

		devServer: {
			proxy: {
				'/socket.io': {
					target: 'http://localhost:3000',
					ws: true
				}
			}
		},

		plugins: plugins
	};
};