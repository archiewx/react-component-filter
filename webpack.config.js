const path = require('path')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'RCFilter',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.d.ts'],
    alias: {
      'react-native': 'react-native-web'
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [new CleanWebpackPlugin(['lib'])],
  performance: {
    hints: false
  }
}
if (process.env.NODE_ENV === 'development') {
  config.entry = './src/index.spec.tsx'

  config.module.rules.push({
    test: /\.(css|scss)$/,

    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1
        }
      },
      {
        loader: require.resolve('sass-loader')
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: ['> 1%', 'last 4 version', 'Firefox ESR', 'not ie < 9'],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  })
}

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/index.tsx'
  config.module.rules.push({
    test: /\.scss$/,
    // use: ExtractPlugin.extract({
    //   fallback: 'style-loader',
    //   use: ['css-loader', 'sass-loader']
    // })
    use: [
      // 'style-loader',
      // MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
          minimize: true,
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: ['> 1%', 'last 4 version', 'Firefox ESR', 'not ie < 9'],
              flexbox: 'no-2009'
            })
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
  config.plugins.concat([
    new ForkTsCheckerWebpackPlugin({
      async: false
    })
    // new ExtractPlugin({ filename: 'index.css', allChunks: true })
    // new MiniCssExtractPlugin({
    //   filename: 'index.[name].css',
    //   chunkFilename: '[id].css'
    // })
  ])
}

module.exports = config
