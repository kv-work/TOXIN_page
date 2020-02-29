const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ghpages = require('gh-pages')

ghpages.publish('dist', function(err) {});

module.exports = (env = {}) => {

  const {
    mode = "development"
  } = env;

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
        template: "./src/pages/colors-n-type/colors-n-type.pug"
      }),

      new HtmlWebpackPlugin({
        chunks: ['form'],
        filename: "form/form.html",
        template: "./src/pages/form-elements/form_elements.pug"
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        moduleFilename: ({
          name
        }) => name === 'main' ? '[name].css' : '[name]/[name].css'
      }))
    }

    return plugins
  }

  //Объект настроек
  return {

    mode,

    entry: {
      'main': './src/index.js',
      'colors': './src/pages/colors-n-type/colors.js',
      'form': './src/pages/form-elements/form.js'
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
          exclude: /img/,
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
          exclude: /img/,
          use: [{
            loader: 'file-loader',
            options: {
              publicPath: '../fonts',
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }]
        },

        //Loading images
        {
          test: /\.(png|gif|jpeg|jpg|svg)$/,
          exclude: /fonts/,
          use: [{
            loader: 'file-loader',
            options: {
              publicPath: '../img',
              outputPath: 'img',
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