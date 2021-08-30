/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint import/no-commonjs: 'off' */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

function plugins({ production }) {
  if (production === undefined) {
    throw new Error('plugins: Missing parameter');
  }

  const defaultPlugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ];

  let additionalPlugins = [];
  if (production) {
    console.log('No additionalPlugin yet');
  } else {
    additionalPlugins = [
      new HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: 'tsconfig.json',
        },
        eslint: {
          files: 'src/**/*.{js,ts}',
        },
      }),
    ];
  }

  return [...defaultPlugins, ...additionalPlugins];
}

function styleLoaders({ production, sourceMap }) {
  if (production === undefined || sourceMap === undefined) {
    throw new Error('styleLoaders: Missing parameter');
  }

  const loaders = [];

  loaders.push({
    loader: MiniCssExtractPlugin.loader,
  });

  loaders.push({
    loader: 'css-loader',
    options: {
      sourceMap,
    },
  });

  loaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              stage: 4, // Only stable polyfills
              autoprefixer: {},
            },
          ],
        ],
        sourceMap,
      },
    },
  });

  loaders.push({
    loader: 'sass-loader',
    options: {
      sourceMap,
      sassOptions: {
        includePaths: [path.resolve(__dirname, 'src')],
      },
    },
  });

  return loaders;
}

module.exports = function (env, options) {
  const mode = options.mode || 'development';
  const production = mode === 'production';
  const sourceMap = true;

  console.log(`Webpack running in "${mode}" mode`);

  const resolvedExtensions = ['.ts', '.tsx', '.js'];

  const buildFolder = 'dist';

  // See what changes what here: https://webpack.js.org/configuration/devtool/#devtool
  let devtool = 'eval-cheap-module-source-map';
  if (production) {
    devtool = 'cheap-source-map';
  } else if (process.env.CI) {
    devtool = undefined;
  }

  let devServer;
  if (!production) {
    devServer = {
      static: path.resolve(__dirname, buildFolder),
      port: process.env.PORT || '1234',
      historyApiFallback: true,
      hot: true,
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Methods':
          'HEAD, GET, POST, PUT, DELETE, PATCH, OPTIONS',
      },
    };
  }

  return {
    target: 'web',
    mode,
    devServer,
    entry: {
      algoliasearchNetlify: [
        path.resolve(__dirname, 'src', 'index.scss'),
        path.resolve(__dirname, 'src', 'index.ts'),
      ],
    },
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                compact: production,
                presets: [
                  ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '3' }],
                ],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json',
                transpileOnly: !production,
                experimentalWatchApi: !production,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: styleLoaders({ production, sourceMap }),
        },
      ],
    },
    resolve: {
      extensions: resolvedExtensions,
    },
    optimization: {
      minimize: production,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            parse: {},
            compress: {},
            mangle: true,
            output: null,
            toplevel: true,
            ie8: false,
          },
        }),
      ],
      usedExports: true,
      sideEffects: true,
    },
    plugins: plugins({ production }),
    output: {
      path: path.resolve(__dirname, buildFolder),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: '[name]',
      publicPath: '/',
      chunkLoadTimeout: 30000,
    },
    stats: {
      assets: true,
      assetsSort: 'size',
      builtAt: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      colors: true,
      entrypoints: false,
      hash: false,
      loggingTrace: true,
      modules: false,
      version: false,
    },
  };
};
