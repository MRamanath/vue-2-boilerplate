const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// eslint-disable-next-line no-unused-vars
const compressionConfig = new CompressionWebpackPlugin({
	filename: '[path][base].gz',
	algorithm: 'gzip',
	test: /\.js$|\.css$|\.html$/,
	threshold: 10240,
	minRatio: 0.8
})

// Use it inside configureWebpack like below in production
// plugins: [compressionConfig]

module.exports = {
	css: {
		requireModuleExtension: true,
		sourceMap: false,
		loaderOptions: {
			scss: {
				prependData: `@import "~/assets/styles/app.scss";`
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, 'src')
			},
			extensions: ['.js', '.vue', '.json']
		}
	},
	chainWebpack: (config) => {
		config.plugins.delete('prefetch')
		config.plugin('html').tap((args) => {
			args[0].title = process.env.VUE_APP_TITLE
			return args
		})
	},
	productionSourceMap: process.env.NODE_ENV !== 'production',
	runtimeCompiler: false,
	lintOnSave: true,
	parallel: require('os').cpus().length > 1,
	crossorigin: 'anonymous',
	integrity: true
}
