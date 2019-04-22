(function() {
  'use strict';

  /**
     * @param {string} first 最初の文字
     * @param {string} last 最後の文字
     * @return {object} オブジェクト
     */
  function range(first, last) {
    const result = [];
    for (let i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
      const obj = {};
      obj.key = String.fromCodePoint(i);
      obj.convertTo = String.fromCodePoint(i);
      result.push(obj);
    }
    return result;
  }

  const alphabets = range('A', 'Z');

  const vm = new Vue({
    el: '#app',
    data: {
      cipher: 'CIPHER HERE',
      alphabets: alphabets,
    },
    filters: {
      alignDegit: function(value) {
        return (' ' + value).substr(-2);
      },
      numberWithPercent: function(value) {
        return (value * 100).toFixed(1) + '%';
      },
    },
    computed: {
      decodeString: function() {
        const splitStr = this.cipher.split('');
        const decodeCharaArray = [];
        for (let i = 0; i < splitStr.length; i++) {
          let flag = false;
          const obj = {};
          for (let j = 0; j < 26; j++) {
            if (splitStr[i] === this.alphabets[j].key) {
              obj.chara = this.alphabets[j].convertTo;
              if (this.alphabets[j].key === this.alphabets[j].convertTo) {
                obj.isChange = false;
              } else {
                obj.isChange = true;
              }
              flag = true;
            } else if (j === 25 && flag === false) {
              obj.chara = splitStr[i];
              obj.isChange = false;
            }
          }
          decodeCharaArray.push(obj);
        }
        return decodeCharaArray;
      },
    },
    methods: {
      charaCount: function(chara) {
        return this.cipher.split(chara).length - 1;
      },
      charaRate: function(cCount) {
        const strLen = this.cipher.replace(/\s+/g, '').length;
        if (strLen === 0) {
          return 0;
        } else {
          return (cCount / strLen);
        }
      },
    },
  });
})();
