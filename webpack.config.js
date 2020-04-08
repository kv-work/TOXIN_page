const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const ghpages = require('gh-pages');
const fs = require('fs');
const path = require('path');

ghpages.publish('dist', function(err) {});

module.exports = (env = {}) => {

  const {
    mode = "development"
  } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";


  const pages = [];

  fs
    .readdirSync(path.resolve(__dirname, 'src', 'pages'))
    .filter((file) => {
      return file.indexOf('base') !== 0;
    })
    .forEach((file) => {
      pages.push(file.split('/', 2));
    });

  function getHtmlPluginForMultiPages(pagesArr) {
    const plugins = pagesArr.map( (page) => {
      const pageName = page[0]
      return new HtmlWebpackPlugin({
        getData: () => {
          try {
            const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `src/pages/${pageName}/data.json`), 'utf8'))
            return data
          } catch(err) {
            console.log(err)
            return {}
          }

        },
        filename: (pageName === 'landing') ? 'index.html' : `${pageName}.html`,
        template: path.resolve(__dirname, `src/pages/${pageName}/${pageName}.pug` ),
        inject: 'body'
      })
    
    } )

    return plugins
  }

  //Функция для настройки loader'ов стилей
  function getStyleLoaders() {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ]
  }

  //Функция для настройки подключаемых plagin'ов
  function getPlugins() {
    const plugins = [
      ...getHtmlPluginForMultiPages(pages),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: '[name].css'
      }))
    }

    return plugins
  }

  //Объект настроек
  return {

    mode,

    entry: './src/index.js',

    output: {
      filename: 'index.js'
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
              publicPath: './fonts',
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
              publicPath: './img',
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