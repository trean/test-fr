'use strict';

(function() {
  var arr = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
  i = 0;

  function appendItem(arr, i) {
    var text = (i == 0) ? arr[i] : ', ' + arr[i];
    var item = document.createTextNode(text);
    document.getElementById('js-append').appendChild(item);
    i++;
    if (i < arr.length) {
      setTimeout(function() {appendItem(arr, i)}, 1000);
    }
  }
  appendItem(arr, i);
})();
