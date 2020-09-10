const imgContext = require.context(
  '!!file-loader?name=[name].[ext]!.',
  true,
  /\.(png)$/,
);
imgContext.keys().forEach(imgContext);
