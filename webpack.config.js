const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {

	const { mode = "development" } = env;
	
	const isProd = mode === "production";
	const isDev = mode === "development";

	function getStyleLoaders() {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader'
		]
	}

	function getPlugins() {
		const plugins = [	new HtmlWebpackPlugin(
					{	filename: "index.html",
						template: "./src/index.pug"}
				) ];

		if (isProd) {
			plugins.push( new MiniCssExtractPlugin() )
		}

		return plugins
	}




	return {
		
			mode,

			module: {
				rules: [
		
					//Loading .pug
					{
						test: /\.pug$/,
						loader: "pug-loader",
						options: {
							pretty: true
						}
					},
		
					//Loading CSS
					{
						test: /\.css$/,
						use: getStyleLoaders()
					},
		
					//Loading SCSS/Sass
					{
						test: /\.(s[ca]ss)$/,
						use: [ ...getStyleLoaders(), "sass-loader"]
					},

					//Loadin Fonts
					{
						test: /\.(ttf|woff|otf|woff2|eot|svg)$/,
						use: [{
							loader: 'file-loader',
							options: {
								publicPath: 'fonts',
								outputPath: 'fonts',
								name: '[name].[ext]'
							}
						}]
					}
		
				]
			},
		
			plugins: getPlugins()
			
		}

	}

	
	