const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

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

  //Функция для настройки подключаемых plagin'ов
  function getPlugins() {
    const plugins = [
      new HtmlWebpackPlugin({
        chunks: ['main'],
        filename: "index.html",
        template: "./src/index.pug"
      }),

      new HtmlWebpackPlugin({
        chunks: ['colors'],
        filename: "colors/colors.html",
        template: "./src/ui-kits/colors-n-type/colors-n-type.pug"
      }),

      new HtmlWebpackPlugin({
        chunks: ['form'],
        filename: "form/form.html",
        template: "./src/ui-kits/form-elements/form_elements.pug"
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => name === 'main' ? '[name].css' : '[name]/[name].css'
      }))
    }

    return plugins
  }

  //Объект настроек
  return {

    mode,

    entry: {
      'main': './src/index.js',
      'colors': './src/ui-kits/colors-n-type/colors.js',
      'form': './src/ui-kits/form-elements/form.js'
    },

    output: {
      // path: __dirname,
      filename: ({
        chunk
      }) => chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
    },

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
          use: [
            ...getStyleLoaders(),
            {
              loader: 'resolve-url-loader'             
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },

        //Loadin Fonts
        {
          test: /\.(ttf|woff|otf|woff2|eot|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              publicPath: '../fonts',
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }]
        }

      ]
    },

    //Loading plugins
    plugins: getPlugins()

  }

}
