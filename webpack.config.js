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
					}
		
				]
			},
		
			plugins: getPlugins()
			
		}

	}

	
	