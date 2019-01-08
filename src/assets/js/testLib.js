;
(function () {
  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Used as a reference to the global object. */
  var root = freeGlobal || Function('return this')();
  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /**
   * 判断是否是数组类型。 
   * @memberof  util
   * @param {Array} val 要判断的值
   *  @author 王帅  <ws@jusfoun.com>
   * @example
   * JFE.util.isArray([]) //true
   * 
   */

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }
  /**
   * 判断是否是日期类型。 
   * @memberof  util
   * @param {Date} val 要判断的值
   * @author 王帅  <ws@jusfoun.com>
   * @example
   * JFE.util.isDate(new Date()) //true
   *  
   */
  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }
  let JFE = {}
  JFE.isArray = isArray
  JFE.isDate = isDate
  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root.JFE = JFE;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return JFE;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = JFE).JFE = JFE;
    // Export for CommonJS support.
    freeExports.JFE = JFE;
  }
  else {
    // Export to the global object.
    root.JFE = JFE;
  }
}.call(this))