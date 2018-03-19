var config = {
    entry: './react/main.js',
    output: {
       path:'/',
       filename: 'index.js',
    },
    devServer: {
       inline: true,
       port: 3000,
       historyApiFallback: true
    },
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015', 'react']
             }
          },
          { 
              test: /\.css$/, 
              loader: "style-loader!css-loader" 
          }
       ]
    }
 }
 module.exports = config;