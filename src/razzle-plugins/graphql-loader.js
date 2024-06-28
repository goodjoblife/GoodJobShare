module.exports = function(source, map, meta) {
  var callback = this.async();

  import('gqlmin').then(m => {
    const gqlmin = m.default;
    const minified = gqlmin(source);
    const result = `export default ${JSON.stringify(minified)};`;
    callback(null, result, map, meta);
  });
};
