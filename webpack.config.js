module.exports = {
  context: __dirname + '/src/app',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  },
  watch: true
}
