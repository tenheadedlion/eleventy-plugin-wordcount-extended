const wordcount = require("./src/wordcount");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("wordcount", wordcount);
  eleventyConfig.addFilter("wc", wordcount);
};
