var request = require('request'),
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

// собираем ссылки. добавляем флаг isMain, чтобы запускать рекурсию
// только в одном случае из n (здесь n=3, вызов ниже в callback запроса)
function grabUrl(url, done, pending, isMain) {

  request(url, function(error, responce, body) {
    // отлавливаем ошибки и сообщаем о них
    if(error){
      console.log('Не удалось получить страницу из-за следующей ошибки: ' + error + ' ==> ' + url);
      return;
    }

    // добавляем url в done
    done[url] = i;
    i++;

    // загружаем тело страницы в Cheerio для работы с DOM,
    // получаем все теги ссылок со страницы
    var $ = cheerio.load(body),
    links = $("a");

    for (var j = 0; j < links.length; j++) {
      var link = links[j];
      // получаем атрибут href для каждой ссылки, если он есть
      if ($(link).attr("href")) {
        var thisUrl = $(link).attr("href");
        // нормализуем и, если нормализация возвращает не null добавляем к pending
        thisUrl = myNormalize(url, thisUrl);
        if (Object.keys(done).length + Object.keys(pending).length >= 1000) {
          break;
        }
        if (thisUrl !== null && !done[thisUrl]) pending[thisUrl] = i;
      }
    }
    if (isMain) {
      if (Object.keys(done).length + Object.keys(pending).length < 1000 && Object.keys(pending).length > 0) {
        getFromPending(done, pending, true); 
        getFromPending(done, pending, false); 
        getFromPending(done, pending, false); 
      } else {
        printResult(done, pending);
      }
    }
  }); 
}
// для ссылок из очереди: 
// 1. удаляем ссылку из очереди,
// 2. "грабим" эту ссылку
function getFromPending(done, pending, isMain) {
  if (Object.keys(pending).length > 0) {
    var url = Object.keys(pending)[0];
    delete pending[url];
    grabUrl(url, done, pending, isMain);
  }
}

getFromPending(done, pending, true);

// выводим на экран результат
function printResult(done, pending) {
  pending = Object.keys(pending).slice(0, 1000 - Object.keys(done).length);
  for (key in done) {
    console.log(key);
  }
  for (key in pending) {
    console.log(pending[key]);
  }   
}
