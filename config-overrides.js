const path = require("path");
const webpack = require('webpack')

module.exports = function override(config, env) {
	const wasmExtensionRegExp = /\.wasm$/;

	config.resolve.extensions.push(".wasm");

	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		crypto: require.resolve("crypto-browserify"),
		stream: require.resolve("stream-browserify"),
		assert: require.resolve("assert"),
		http: require.resolve("stream-http"),
		https: require.resolve("https-browserify"),
		os: require.resolve("os-browserify"),
		url: require.resolve("url"),
		path: require.resolve("path-browserify"),
		fs: false,
	});
	config.resolve.fallback = fallback;
	config.plugins.push(
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		})
	);

	config.module.rules.forEach((rule) => {
		(rule.oneOf || []).forEach((oneOf) => {
			if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
				// make file-loader ignore WASM files
				oneOf.exclude.push(wasmExtensionRegExp);
			}
		});
	});

	// add a dedicated loader for WASM
	config.module.rules.push({
		test: wasmExtensionRegExp,
		include: path.resolve(__dirname, "src"),
		use: [{ loader: require.resolve("wasm-loader"), options: {} }],
	});

	return config;
};
