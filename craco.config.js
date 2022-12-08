module.exports = {
	webpack: {
		configure: {
			// See https://github.com/webpack/webpack/issues/6725
			module: {
				noParse: /\.wasm/,
				rules: [
					{
						test: /\.wasm$/,
						type: "javascript/auto",
						use: 'file-loader'
					},
				],
			},
			resolve: {
				fallback: {
					crypto: require.resolve("crypto-browserify"),
					stream: require.resolve("stream-browserify"),
					assert: require.resolve("assert"),
					http: require.resolve("stream-http"),
					https: require.resolve("https-browserify"),
					os: require.resolve("os-browserify"),
					url: require.resolve("url"),
					path: require.resolve("path-browserify"),
					fs: false,
				},
			},
		},
	},
};
