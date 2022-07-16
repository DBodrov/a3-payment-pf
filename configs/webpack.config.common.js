const {resolveApp} = require('./utils');

module.exports = {
  entry: {
    main: resolveApp('src/index.tsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', resolveApp('src')],
    alias: {
      src: resolveApp('src'),
      '@': resolveApp('src'),
      static: resolveApp('src/static'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|json)$/,
        include: /(@a3)/,
        use: 'babel-loader',
        // loader: 'esbuild-loader',
        // options: {
        //   loader: 'tsx',
        //   target: 'es2015',
        // },
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(bmp|gif|jpg|png)$/,
        type: 'asset/resource',
      },
    ],
  },
};
