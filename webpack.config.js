var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('./public'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      jquery: path.join(__dirname, './jquery-stub.js'),
      globalize$: path.resolve(
        __dirname,
        'node_modules/globalize/dist/globalize.js'
      ),
      globalize: path.resolve(
        __dirname,
        'node_modules/globalize/dist/globalize'
      ),
      cldr$: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr.js'),
      cldr: path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr'),
    },
  },
  plugins: [
    //
  ],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static',
      },
    ],
  },
  devServer: {
    port: 9090,
    host: 'localhost',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    contentBase: './public',
    open: true,
    proxy: {
      '/api/*': 'http://127.0.0.1:5005',
    },
  },
};
