;(function() {

  var Util = (function() {

    // Create the XHR object.
    var _createCORSRequest = function (method, url) {
      var xhr = new XMLHttpRequest();
      if("withCredentials" in xhr) {
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
          error   = opts.error   || function (response) {
            console.error('XHR failed:', response);
          };
      var xhr = _createCORSRequest(method, url);
      if(!xhr) {
        console.error('CORS not supported');
        return;
      }

      // Response handlers.
      xhr.onload = function() {
        var completed = 4;
        if(xhr.readyState === completed){
          if(xhr.status === 200){
            success(xhr.responseText, xhr);
          } else {
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

  var sunDom = document.querySelector('#sun');

  if(sunDom) {

    document.querySelector('#btn-sun').addEventListener('click', function (e) {
      e.preventDefault();
      var contentDom = sunDom.querySelector('.content');
      document.querySelector('#sun').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left';
      if(contentDom && !contentDom.innerHTML.length) {
        contentDom.innerHTML = '<p><img src="img/loader.gif" alt="Loader" /> Loading...</p>';
        Util.ajax('http://localhost:5000/api/sun?pretty=false', {
          success: function (res) { sunSuccessCb(res, contentDom); }
        });
      }
    });

    document.querySelector('#btn-sun-back').addEventListener ('click', function (e) {
      e.preventDefault();
      document.querySelector('#sun').className = 'right';
      document.querySelector('[data-position="current"]').className = 'current';
    });

  }

  function sunSuccessCb (response, contentDom) {
    var data = JSON.parse(response).data;
    contentDom.innerHTML = '<p>Sun range: ' + data.range + ' AU</p>';
  }

}).call(this);