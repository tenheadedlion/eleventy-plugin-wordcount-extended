const assert = require("assert");
const wordcount = require("../src/wordcount");

describe("Wordcount Test", function () {
  it("Returns the right word count of a string that contains only Chinese characters", function () {
    assert.equal(wordcount("一个更简单的静态站点生成器"), 13);
  });
  it("Returns the right word count of a string that mixes English with Chinese", function () {
    assert.equal(wordcount("Eleventy, 一个更简单的静态站点生成器"), 14);
  });
  it("Returns the right word count of a string that mixes English with Chinese (2)", function () {
    assert.equal(wordcount("使用 Eleventy Edge 在边缘交付动态网站"), 13);
  });
  it("Returns the right word count of a string that mixes English with Chinese, and full-width punctuations", function () {
    assert.equal(wordcount("Eleventy， 一个更简单的静态站点生成器。"), 16);
  });
  it("Returns the right word count of a string that mixes English with Japanese, and full-width punctuations", function () {
    assert.equal(wordcount("11、より単純な静的サイトジェネレータ。"), 19);
  });
  it("Returns the right word count of a Greek sentence", function () {
    assert.equal(
      wordcount("Έντεκα, μια απλούστερη δημιουργία στατικών τοποθεσιών."),
      6
    );
  });
  it("Returns the right word count of emojis", function () {
    assert.equal(wordcount("😀😁😂😃😄😅😆😇😈"), 9);
  });

  it("Returns the right word count of a multiple line string of miscellaneous characters", function () {
    assert.equal(
      wordcount(`Έντεκα, μια απλούστερη δημιουργία στατικών τοποθεσιών.
      11、より単純な静的サイトジェネレータ。
      Eleventy， 一个更简单的静态站点生成器。
      使用 leventy Edge 在边缘交付动态网站
      Eleventy, 一个更简单的静态站点生成器
      一个更简单的静态站点生成器
      😀😁😂😃😄😅😆😇😈
      `),
      6 + 19 + 16 + 13 + 14 + 13 + 9
    );
  });
});
