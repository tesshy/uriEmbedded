var sys = require('util');
var fs = require('fs');

var inPath = process.argv[2];
var inHtml = fs.readFileSync(inPath).toString();

var jsdom = require('jsdom').jsdom;

jsdom.env(inHtml,['http://code.jquery.com/jquery-1.5.min.js'],
          function(errors, window) {
              window.$('img').each(function () {
                  var imgPath = window.$(this).attr('src');
                  var imgURI = fs.readFileSync(imgPath, 'base64');
                  var uri = "data:image/" + imgPath.split('.').pop() + ";base64," + imgURI;
                  window.$(this).attr('src', uri);
              });
              
              console.log(window.document.innerHTML);
          });



