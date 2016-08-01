var request = require('sync-request'),
    cheerio = require('cheerio'),
    urlParse = require('url'),
    domen = 'https://ru.wikipedia.org/',
    done = {}, // ссылки, которые уже обошли 
    pending = {}, // ссылки в очереди
    i = 1;

pending[domen] = 0;

// функция для нормализации и фильтрации ссылок
function myNormalize(currentUrl, url) {
  var currentUrlObj = urlParse.parse(currentUrl);
  var urlObj = urlParse.parse(url);
  var domen = currentUrlObj.hostname;
  // если в ссылке есть hostname, cоответстующий сайту,
  // возвращаем ее без изменений
  if (urlObj.hostname === domen) {
    return url;
  // если hostname другой, возвращаем null
  } else if (urlObj.hostname !== null) {
    return null;
  // в остальных случаях резолвим текущий url cо ссылкой
  }  else {
    return urlParse.resolve(currentUrl, url);
  } 
}

// собираем ссылки
function grabUrl(url, pending) {

  // отлавливаем ошибки и сообщаем о них
  try {
    var response = request('GET', url);
  } catch (error) {
    console.log('Не удалось получить страницу из-за следующей ошибки: ' + error + ' ==> ' + url);
  }
  // добавляем url в done
  done[url] = i;
  i++;

  // загружаем тело страницы в Cheerio для работы с DOM,
  // получаем все теги ссылок со страницы
  var $ = cheerio.load(response.body),
  links = $("a");

  for (var j = 0; j < links.length; j++) {
    var link = links[j];
    // получаем атрибут href для каждой ссылки, если он есть
    if ($(link).attr("href")) {
      var thisUrl = $(link).attr("href");
      // нормализуем и, если нормализация возвращает не null добавляем к pending
      thisUrl = myNormalize(url, thisUrl);
      if (Object.keys(done).length + Object.keys(pending).length >= 1000) {
        return;
      }
      if (thisUrl !== null && !done[thisUrl]) pending[thisUrl] = i;
    }
  }
} 

// для ссылок из очереди: 
// 1. удаляем ссылку из очереди,
// 2. "грабим" эту ссылку
function getFromPending(pending) {
  var url = Object.keys(pending)[0];
  delete pending[url];
  grabUrl(url, pending); 
}

while (Object.keys(done).length + Object.keys(pending).length < 1000 && Object.keys(pending).length > 0) {
  getFromPending(pending);
}

// выводим на экран результат
for (key in done) {
  console.log(key);
}
for (key in pending) {
  console.log(key);
}
