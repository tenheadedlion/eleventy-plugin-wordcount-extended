function wordcount(str) {
  str = str.split(/\s+/g);
  return str.map(wordcountWithoutSpace).reduce((prev, curr) => prev + curr, 0);
}

// Perform a not exactly acurate counting of words
// ---
// The original Nunjuck `wordcount` filter separates words by splitting them by space, 
// but this doesn't work in case of CJK (Chinese, Janpanse, Korean) 
//  and the some other languages that follow a similar convention,
// they need a more complex mechanism to detect word boundaries, including dictionary lookup.
// But in practice, the word count of a blog is often less important, 
//  and the definition of word can be ambiguous due to the existence of non-natural languages,
// so keep the code simple and fast, this function will parse each high code point character as a word,
// as a trade off, the result is possibly inacurate
function wordcountWithoutSpace(str) {
  var cnt = 0;
  var i = 0;
  var end = str.length; // JS uses UTF-16 string format, meaning each unit has 2 bytes
  while (i < end) {
    var code = str.charCodeAt(i);
    if (code < 0x2e80) { // Chose the number from U+2E80..U+2EFF	CJK Radicals Supplement
      do {
        i += 1;
        code = str.charCodeAt(i);
      } while (i < end && code <= 0x2e80);
      cnt += 1;
    } else if (code >= 0x2e80 && code <= 0x9fff) {
      // CJK, the range is not acurate
      cnt += 1;
      i += 1;
    } else if (code >= 0xd800 && code <= 0xdfff) {
      // Surrogate pair: may form an emoji
      // > "😀".charCodeAt(0).toString(16) // High Surrogates
      // 'd83d'
      // > "😀".charCodeAt(1).toString(16) // Low Surrogates
      // 'de00'
      cnt += 1;
      i += 2;
    } else if (code > 0xffff) {
      // code point in this range take up three to four bytes in UTF-8, 2 bytes in UTF-16
      cnt += 1;
      i += 2;
    } else {
      // with "\uffff".length === 1, code point less then 0xffff is considered as a word
      cnt += 1;
      i += 1;
    }
  }

  return cnt;
}

module.exports = wordcount;
