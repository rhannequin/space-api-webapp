;(function() {

  var Util = (function() {

    // Create the XHR object.
    var _createCORSRequest = function (method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    },

    // Make the actual CORS request.
    _makeCorsRequest = function (url, opts) {
      var method  = opts.method  || 'GET',
          data    = opts.data    || {},
          success = opts.success || function(){},
          error   = opts.error || function(){};
      var xhr = _createCORSRequest(method, url);
      if (!xhr) {
        console.error('CORS not supported');
        return;
      }

      // Response handlers.
      xhr.onload = function() {
        var completed = 4;
        if(xhr.readyState === completed){
          if(xhr.status === 200){
            success(xhr.responseText, xhr);
          }else{
            error(xhr.responseText, xhr);
          }
        }
      };

      xhr.onerror = function() {
        error(xhr.responseText, xhr);
      };

      xhr.send(data);
    };

    var obj = {};

    obj.ajax = function (url, opts) {
      _makeCorsRequest(url, opts);
    };

    return obj;

  }).call(this);

  document.querySelector('#btn-sun').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#sun').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
  });
  document.querySelector('#btn-sun-back').addEventListener ('click', function (e) {
    e.preventDefault();
    document.querySelector('#sun').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  });

}).call(this);