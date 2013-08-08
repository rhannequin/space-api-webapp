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

  var sunButton  = document.querySelector('.get-sun'),
      sunResults = document.querySelector('.sun-results');
  sunButton.addEventListener('click', function() {
    Util.ajax('http://localhost:5000/api/sun?pretty=false', {
      method: 'GET',
      success: function (response) {
        var data = JSON.parse(response).data;
        handleSunRequest(data);
      },
      error: function (response) {
        console.error('XHR failed:', response);
      }
    });
  }, false);


  function handleSunRequest (res) {
    sunResults.innerHTML = 'Sun range: ' + res.range;
  }

}).call(this);