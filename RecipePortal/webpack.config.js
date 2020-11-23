const path = require('path');
module.exports = {
mode: 'development',
entry: './src/recipe.js',
devtool: 'source-map',
devServer: {
contentBase: path.join(__dirname, 'public'),
compress: true,
port: 5000
},
output: {
filename: 'recipe.js',
path: path.resolve(__dirname, 'public'),
},
};