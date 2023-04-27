import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

module.exports = function (config) {
	config.resolve.plugins.push(new TsconfigPathsPlugin());
};
