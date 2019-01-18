function jsonToImg(json) {

  var strData = JSON.stringify(json)
  // 编码
  var uint8array = (new TextEncoder('utf-8')).encode(strData);
  // 计算数据需要的空间大小
  var dataSize = Math.ceil(Math.sqrt(uint8array.length / 3));
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

function imgToJson(src) {
  console.log(typeof src)
  var img = new Image();

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
    console.log(JSON.parse(strData))
  };
  if (typeof src === 'object') {
    let ds = arrayBufferToBase64(src);
    // debugger
    img.src = 'data:image/png;base64,' + ds
  } else {
    img.src = src
  }

}
// 计算字符串的大小
const byteSize = str => new Blob([str]).size;

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export {
  imgToJson
}
export default jsonToImg