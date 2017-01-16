var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');//配置OpenBrowserPlugin插件可以在构建完成之后自动打开浏览器的"localhost:8080"这个路径
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来

var copy = require('quickly-copy-file');
var del = require('del');

// 开发环境
var isDev = function() {
  return process.env.NODE_ENV.trim() === 'development';//判断process.env.NODE_ENV的环境
};

// 生产环境
var isProd = function() {
  return process.env.NODE_ENV.trim() === 'production';
};
copyAndDelFiles();

module.exports = {
  devtool: isProd() ? false : 'inline-source-map',
  entry: {
    index: [
      './src/js/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'redux-thunk',
      'nprogress'
    ]
  },
  output: {
    path: './dist',
    filename: isProd() ? '[name].[chunkhash:8].js' : '[name].js',
    //实际上程序应当只加载当前渲染页所需的 JavaScript，也就是大家说的“代码分拆" — 将所有的代码分拆成多个小包，在用户浏览过程中按需加载。
    //name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。
    //chunkhash 是文件的 hash 码，这里只使用前8位。
    chunkFilename: isProd() ? '[name].chunk.[chunkhash:8].js' : '[name].chunk.js',
    publicPath: isProd() ? './dist/' : '/dist/'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=/[name].[hash:8].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
    }]
  },
  plugins: getPlugins()
};

// 复制和删除文件
function copyAndDelFiles() {
  var copyFile = '';

  // 复制文件
  if (isDev()) {
    copyFile = 'src/html/index_dev.html';
  } 

  if (isProd()) {
    copyFile = 'src/html/index.html';
  }

  copy(copyFile, 'index.html', function(error) {
    if (error) {
      return console.error(error);
    }
  });

  if (isProd()) {
    del(['dist']);
  }
}

// 获取配置
function getPlugins() {
  var plugins = [
    new webpack.DefinePlugin({
      __DEV__ : isDev(),
      __PROD__: isProd(),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV.trim())
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd() ? 'vendor.[chunkhash:8].js' : 'vendor.js'),
    new ExtractTextPlugin(isProd() ? '[name].[chunkhash:8].css' : '[name].css'),
  ];


  if (isProd()) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'celbyo - 播放器',
        filename: '../index.html',
        template: './src/html/index.html'
      }),
      new WebpackMd5Hash()
    );
  }

  return plugins
}