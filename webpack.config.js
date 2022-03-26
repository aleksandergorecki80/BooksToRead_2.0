const path = require('path');

module.exports = env => {
  const environment = env || "production";
  const output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  }
  if (environment === 'production') {
    output.path = path.resolve(__dirname, 'build'),
    output.publicPath = 'build'
  }
  return {
    mode: environment,
    entry: './src/app.ts',
    output: output,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
  }
};
