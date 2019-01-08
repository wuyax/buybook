# Util

## chunk

```js
_.chunk(array, [size=1])
```
Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.

**Arguments**  
  `array (Array)`: The array to process.  
  `[size=1] (number)`: The length of each chunk

**Returns**  
  `(Array)`: Returns the new array of chunks.

**Example**

```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

## compact

```js
_.compact(array)
```
Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.

**Arguments**  
 `array (Array)`: The array to compact.

**Returns**  
`(Array)`: Returns the new array of filtered values.

**Example**

```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```
## concat

```
_.concat(array, [values])
```
Creates a new array concatenating array with any additional arrays and/or values.

**Arguments**  
  `array (Array)`: The array to concatenate.  
  `[values] (...*)`: The values to concatenate.

**Returns**  
  `(Array)`: Returns the new concatenated array.

**Example**

```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```
### Object
