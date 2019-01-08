
/**
  * jflib V1.0.0
  * (c) 2018-2019
  * Copyright all contributors
  * Released under MIT license.
  */
/**
 * 数组去重。
 * @memberof  util
 * @param { Array } arr 数组
 * @returns {Array}
 * @author 魏彬  <weibin@jusfoun.com>
 * @example
 * const a = [1,1,2,3,3,5,6]
 * JFE.util.unique(a) //[1,2,3,5,6]
 */

function unique(arr) {
  var n = [];
  for (var i = 0; i < arr.length; i++) {
    if (n.indexOf(arr[i]) == -1) {
      n.push(arr[i]);
    }
  }
  return n;
}

var unique_1 = unique;

/**
 * 打乱一个数组，让其中的值随机组成新数组。
 * @memberof  util
 * @param { Array } arr 数组
 * @returns {Array} 
 * @author 魏彬  <weibin@jusfoun.com>
 * @example
 *   JFE.util.arrShuffle([1,2,3,4,5,6]) //[3, 4, 6, 2, 5, 1]
 */

function arrShuffle(arr) {
  var _arr = arr.slice(0); //存一个副本 不能直接改变原数组
  for (var i = 0; i < _arr.length; i++) {
    var j = getRandomInt(0, i);
    //临时交换变量
    var t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

//随机返回min 到 max之间的一个任意数 +1 保证取到MAX
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var arrayShuffle = arrShuffle;

var testTool = {
  unique: unique_1,
  arrayShuffle: arrayShuffle
};

var testTool_1 = testTool.unique;
var testTool_2 = testTool.arrayShuffle;

export { testTool_1 as unique, testTool_2 as arrayShuffle };
export default testTool;
