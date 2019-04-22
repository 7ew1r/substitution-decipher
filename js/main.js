(function() {
  'use strict';

  /**
     * @param {string} first 最初の文字
     * @param {string} last 最後の文字
     * @return {object} result オブジェクト
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

  new Vue({
    el: '#app',
    data: {
      cipher: 'CIPHER HERE',
      alphabets: alphabets,
    },
    filters: {
      numberAlignment: function(value) {
        return (' ' + value).substr(-2);
      },
      numberWithPercent: function(value) {
        return (value * 100).toFixed(1) + '%';
      },
    },
    computed: {
      decipherString: function() {
        const decipherCharacters = [];
        for (let i = 0; i < this.cipher.length; i++) {
          let flag = false;
          const obj = {};
          for (let j = 0; j < 26; j++) {
            if (this.cipher[i] === this.alphabets[j].key) {
              obj.chara = this.alphabets[j].convertTo;
              if (this.alphabets[j].key === this.alphabets[j].convertTo) {
                obj.isChange = false;
              } else {
                obj.isChange = true;
              }
              flag = true;
            } else if (j === 25 && flag === false) {
              obj.chara = this.cipher[i];
              obj.isChange = false;
            }
          }
          decipherCharacters.push(obj);
        }
        return decipherCharacters;
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
