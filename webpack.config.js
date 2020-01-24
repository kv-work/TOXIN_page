const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode: "development",
	
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
				use: ["style-loader", "css-loader"]
			},

			//Loading SCSS/Sass
			{
				test: /\.(s[ca]ss)$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}

		]
	},

	plugins: [
			new HtmlWebpackPlugin(
				{
					filename: "index.html",
					template: "./src/index.pug"}
			)
	]
	
}