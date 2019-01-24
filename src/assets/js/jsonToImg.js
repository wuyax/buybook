/**
 * JSON转换为图片
 * @param {object, string} json 需要转转为图片的字符串
 */
function jsonToImg(json) {
  var strData = JSON.stringify(json)
  // 编码
  var uint8array = (new TextEncoder('utf-8')).encode(strData);
  // 计算存储数据需要的图片尺寸
  var dataSize = Math.ceil(Math.sqrt(uint8array.length / 3));
  if(dataSize > 255){
    console.warn('数据长度超出范围')
    return
  }
  // 创建类型数组
  var paddedData = new Uint8ClampedArray(dataSize * dataSize * 4);
  var idx = 0;
  for (var i = 0; i < uint8array.length; i += 3) {
    // 返回给定的起始和结束索引之间的元素组成的新的类型化数组
    var subArray = uint8array.subarray(i, i + 3);
    // 读取一个指定数组中的元素保存到格式化数组中
    paddedData.set(subArray, idx);
    // alpha 通道
    paddedData.set([255], idx + 3);
    idx += 4;
  }
  
  // 创建图片
  var imageData = new ImageData(paddedData, dataSize, dataSize);
  var imgSize = 256;
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = imgSize;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#AA0000';
  ctx.fillRect(0, 0, imgSize, imgSize);
  // 保存数据大小
  // todo 可以把偏移量也设置进去
  ctx.fillStyle = 'rgb(' + dataSize + ',0,0)';
  ctx.fillRect(0, 0, 1, 1);
  ctx.putImageData(imageData, 0, 1);

  // 下载图片
  let aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.setAttribute('id', 'hiddenLink')
  aLink.setAttribute('href', canvas.toDataURL())
  aLink.setAttribute('download', 'image.png')
  let body = document.querySelector('body')
  body.append(aLink)

  var link = document.querySelector('#hiddenLink');
  link.click();
  link.remove();
}

/**
 * 讲图片转换为JSON
 * @param {object, string} src 图片的地址或者arrayBuffer
 */
function imgToJson(src) {
  var img = new Image();
  if (typeof src === 'object') {
    let base64string = arrayBufferToBase64(src);
    img.src = 'data:image/png;base64,' + base64string
  } else {
    img.src = src
  }
  return new Promise(function (resolve, reject) {
    img.onload = function () {
      var imgSize = img.width;
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = imgSize;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var headerData = ctx.getImageData(0, 0, 1, 1);
      var dataSize = headerData.data[0];
      var imageData = ctx.getImageData(0, 1, dataSize, dataSize);
      var paddedData = imageData.data;

      var uint8array = new Uint8Array(paddedData.length / 4 * 3);
      // 取出保存的数据
      var idx = 0;
      for (var i = 0; i < paddedData.length - 1; i += 4) {
        var subArray = paddedData.subarray(i, i + 3);
        uint8array.set(subArray, idx);
        idx += 3;
      }

      var includeBytes = uint8array.length;
      for (var i = uint8array.length - 1; i > 0; i--) {
        if (uint8array[i] == 0) {
          includeBytes--;
        } else {
          break;
        }
      }
      var data = uint8array.subarray(0, includeBytes);
      var strData = (new TextDecoder('utf-8')).decode(data);
      resolve(JSON.parse(strData))
    };
  })
}
// 计算字符串的大小
const byteSize = str => new Blob([str]).size;
/**
 * ArrayBuffer To Base64
 * @param {buffer} buffer ArrayBuffer
 */
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
/**
 * Base64 To ArrayBuffer
 * @param {string} base64 Base64 string
 */
function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export {
  imgToJson
}
export default jsonToImg