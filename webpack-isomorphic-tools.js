// webpack-isomorphic-tools configuration
const WebpackIsomorphicToolsPlugin =
  require('webpack-isomorphic-tools/plugin');
const webpackConfiguration = require('./webpack.config.base');

module.exports = {
  // debug: true,
  patch_require: true,
  alias: webpackConfiguration.resolve.alias,
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extensions: ['svg'],
      runtime: true,
    },
    style_modules: {
      extensions: ['css'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log); // eslint-disable-line max-len
        }
        return regex.test(module.name);
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log); // eslint-disable-line max-len
        }
        return module.name;
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log); // eslint-disable-line max-len
        }
        return module.source;
      },
    },
  },
};
