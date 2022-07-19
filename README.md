# eleventy-plugin-wordcount-extended

An [Eleventy](https://github.com/11ty/eleventy) universal plugin to An eleventy plugin to count and output the number of words in a string.

Nunjuck's buildin filter [`wordcount`](https://mozilla.github.io/nunjucks/templating.html#wordcount) does not correctly calculate the word count of non-ASCII strings, for example, the following code generates `1 1`, the third line is ignored by nunjuck.

```njk
{{ "Eleventy" | wordcount }}
{{ "Eleventy, 一个更简单的静态站点生成器" | wordcount }}
{{ "😀😁😂😃😄😅😆😇😈" | wordcount }}
```

With this version of `wordcount`, the result would be `1 14 9`.

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-wordcount-extended).

```bash
npm install eleventy-plugin-wordcount-extended --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and add the plugin:

```js
const wordcountPlugin = require("eleventy-plugin-wordcount-extended");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(wordcountPlugin);
};
```

## Usage

In your (Nunjucks, Liquid or Handlebars) templates, use the following syntax to get the word count of a string:

```html
// nunjucks/liquid {{ content | wordcount }} // handlebars {{{ wordcount content
}}}
```

Note that the `wordcount` filter from this plugin will override [that of nunjuck](https://mozilla.github.io/nunjucks/templating.html#wordcount), if this is not what you want, you can replace `wordcount` with `wc`:

```html
{{ content | wc }}
```
