;(function() {

  var Util = (function() {

    // Create the XHR object.
    var _createCORSRequest = function (method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
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

    this.ajax = function (url, opts) {
      _makeCorsRequest(url, opts);
    };

    return this;

  }).call(this);



  var sunButton  = document.querySelector('.get-sun'),
      sunResults = document.querySelector('.sun-results');
  sunButton.addEventListener('click', function() {
    Util.ajax('http://space-api.herokuapp.com/api/sun?pretty=false', {
      method: 'GET',
      success: function (response, xhr) {
        var data = JSON.parse(response).data;
        handleSunRequest(data);
      },
      error: function (response, xhr) {
        console.error('XHR failed:', response);
      }
    });
  }, false);


  var handleSunRequest = function (res) {
    sunResults.innerHTML = 'Sun range: ' + res.range;
  };

}).call(this);