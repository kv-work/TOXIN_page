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