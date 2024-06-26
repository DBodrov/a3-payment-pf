const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const {resolveApp, appName} = require('./utils');
const {sslCert, sslKey} = require('./cert');
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = 6333;
const VERSION = require('../package.json').version;
const dev = process.env.NODE_ENV !== 'production';

module.exports = (env, argv) => {
  return webpackMerge.merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    bail: true,
    target: 'web',
    stats: 'minimal',

    output: {
      path: resolveApp('dist'),
      pathinfo: true,
      filename: 'static/js/[name].bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: '@linaria/webpack-loader',
              options: {
                sourceMap: process.env.NODE_ENV !== 'production',
              },
            },
          ],
          // loader: 'esbuild-loader',
          // options: {
          //   loader: 'tsx',
          //   target: 'es2015',
          // },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {sourceMap: dev},
            },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: 'static/js/vendor.js',
            priority: -20,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          common: {
            chunks: 'all',
            minChunks: 2,
            filename: 'static/js/[name].js',
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`,
      },
      emitOnErrors: false,
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolveApp('src/index.html'),
        inject: true,
        hash: true,
        chunksSortMode: 'none',
        version: VERSION,
      }),

      // new webpack.ProvidePlugin({
      //   process: 'process/browser',
      // }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        USE_API_MOCKS: env.USE_API_MOCKS ?? 'false',
        VERSION: VERSION,
      }),

      new WebpackBar({name: appName}),
      new ReactRefreshWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{from: 'src/mockServiceWorker.js', to: 'dist/mockServiceWorker.js'}],
      }),
      new MiniCssExtractPlugin({filename: 'styles.css'}),
    ],

    experiments: {
      topLevelAwait: true,
    },

    devServer: {
      hot: true,
      server: {
        type: 'https',
        options: {
          key: sslKey,
          cert: sslCert,
        },
      },
      static: {
        directory: resolveApp('dist'),
      },

      port: PORT,
      historyApiFallback: true,
      proxy: {
        '/v1': {
          target: 'https://payment-dev.a-3.ru',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
