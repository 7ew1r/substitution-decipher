(function () {
    'use strict';

    function range(first, last) {
        var firstC = first.charCodeAt(0);
        var lastC = last.charCodeAt(0);
        var result = new Array();
        for (var i = firstC; i <= lastC; i++) {
            var obj = new Object();
            obj.key = String.fromCodePoint(i);
            obj.convertTo = String.fromCodePoint(i);
            result.push(obj);
        }
        return result;
    }

    const alphabetPairs = range('A', 'Z');

    var vm = new Vue({
        el: '#app',
        data: {
            string: "CIPHER HERE",
            alphabetPairs: alphabetPairs
        },
        filters: {
            alignDegit: function (value) {
                return (" " + value).substr(-2);
            },
            numberWithPercent: function (value) {
                return (value * 100).toFixed(1) + '%';
            }
        },
        computed: {
            decodeString: function () {
                var splitStr = this.string.split('');
                var decodeCharaArray = new Array();
                for (var i = 0; i < splitStr.length; i++) {
                    var flag = false;
                    var obj = new Object();
                    for (var j = 0; j < 26; j++) {
                        if (splitStr[i] === this.alphabetPairs[j].key) {
                            obj.chara = this.alphabetPairs[j].convertTo;
                            if (this.alphabetPairs[j].key === this.alphabetPairs[j].convertTo) {
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
            }
        },
        methods: {
            charaCount: function (chara) {
                return this.string.split(chara).length - 1;
            },
            charaRate: function (cCount) {
                var strLen = this.string.replace(/\s+/g, "").length;
                if (strLen === 0) {
                    return 0
                } else {
                    return (cCount / strLen)
                }
            }
        }
    });
})();