const imgContext = require.context(
  '!!file-loader?name=img/[name].[ext]!.',
  true,
  /\.(png)$/,
);
imgContext.keys().forEach(imgContext);
