const urlParse = require('url'); 
var domen = 'example.com';

function myNormalize(currentUrl, url) {
  var currentUrlObj = urlParse.parse(currentUrl);
  var urlObj = urlParse.parse(url);
  var domen = currentUrlObj.hostname;
  if (urlObj.hostname === domen) {
    return url;
  } else if (urlObj.hostname !== null) {
    return null;
  }  else {
    return urlParse.resolve(currentUrl, url);
  } 
}

if (require.main === module) { 
  // tests
  if (myNormalize('http://example.com/some/file.html', '/abs/path') != 'http://example.com/abs/path') {
    console.log('Error')
  } else {
    console.log('ok')
  }
  if (myNormalize('http://example.com/some/file.html', 'abs/path') != 'http://example.com/some/abs/path') {
    console.log('Error')
  } else {
    console.log('ok')
  }
  if (myNormalize('https://example.com/some/file.html', '/abs/path') != 'https://example.com/abs/path') {
    console.log('Error')
  } else {
    console.log('ok')
  }
  if (myNormalize('http://example.com', '/abs/path') != 'http://example.com/abs/path') {
    console.log('Error')
  } else {
    console.log('ok')
  }
  if (myNormalize('http://example.com', 'http://other.com/abs/path') != null) {// Игнорируем сторонние домены
    console.log('Error')
  } else {
    console.log('ok')}
  if (myNormalize('http://example.com', 'https://example.com/abs/path') != 'https://example.com/abs/path') {
    console.log('Error')
  } else {
    console.log('ok')
  }

}
