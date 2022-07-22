const CracoLessPlugin = require("craco-less");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  style: {
    postcss: {
      plugins: () => [
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
  //...
    configure: (webpackConfig, { env, paths }) => {
      if (process.argv.includes('--analyze-only'))
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      return webpackConfig;
    }
  }
};