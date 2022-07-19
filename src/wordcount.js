function wordcount(str) {
  str = str.split(/\s+/g);
  return str.map(wordcountWithoutSpace).reduce((prev, curr) => prev + curr, 0);
}

function wordcountWithoutSpace(str) {
  // inspired by
  //    - https://stackoverflow.com/a/12206089/19406298
  //    - https://stackoverflow.com/a/20399479/19406298
  //    - https://stackoverflow.com/a/62898106/19406298
  var cnt = 0;
  var i = 0;
  var end = str.length;
  while (i < end) {
    var code = str.charCodeAt(i);
    if (code <= 0x7ff) {
      do {
        i += 1;
        code = str.charCodeAt(i);
      } while (i < end && code <= 0x7ff);
    } else if (code >= 0xd800 && code <= 0xdfff) {
      // Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
      // (Assume next char is the other [valid] half and just skip it)
      i += 2;
    }
    else {
      i += 1;
    }
    cnt += 1;
  }

  return cnt;
}


module.exports = wordcount;
