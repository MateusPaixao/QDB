const path = require('path');
const webpack = require('webpack');
const entry = require('webpack-glob-entry');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const autoprefixer = require('autoprefixer');

const storeName = 'qbbr';

const VTEX_JS = './dist/assets/js';
const VTEX_CSS = './dist/assets/css';
const VTEX_QAJS = './qa/assets/js';
const VTEX_QACSS = './qa/assets/css';

const config = {
	entry: entry('./src/assets/js/common/*.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.m?js|jsx$/,
				exclude: /node_modules/,
				use: {
						loader: 'babel-loader'
				},
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
		],
	},
	resolve: {
	  alias: {
		ConfigBases: path.resolve(__dirname, 'src/scss/config/settings/config-bases.scss'),
	  }
	},
	plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer()]
        }
    }),
    new BundleAnalyzerPlugin(),
	new OptimizeCSSAssets(),
	new BrowserSyncPlugin({
      open: 'external',
      https: true,
      ui: false,
      host: `${storeName}.vtexlocal.com.br`,
      startpath: '/admin/login/',
      proxy: `https://${storeName}.vtexcommercestable.com.br`,
      serveStatic: [
        {
          route: '/arquivos',
          dir: [VTEX_JS, VTEX_CSS, VTEX_QAJS, VTEX_QACSS],
        },
      ],
	}),
	new FileManagerPlugin({
		onEnd: {
			copy: [
			{ source: path.resolve(__dirname, 'dist/assets'), destination: path.resolve(__dirname, 'qa/assets') },
			]}
		})
	],
};

module.exports = config;