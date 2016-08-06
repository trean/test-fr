// console.time('exec time');
var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    urlParse = require('url'),
    domen = 'https://ru.wikipedia.org/',
    done = {}, // ссылки, которые уже обошли 
    allUrls = {}, // все ссылки
    currentTasksCount = 0, // текущее количество задач
    printed = false, // флаг для проверки выводился ли уже результат
    i = 1;

var LINK_COUNT = 1000, // количествo выводимых ссылок
      MAX_TASK_COUNT = 20; // максимальное количество запросов

allUrls[domen] = 0;

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
function grabUrl(url, allUrls) {

  // если ссылка уже есть в done, возвращаем управление из функции
  if (done[url]){ 
    return;
  }

  // перед запросом инкрементируем счетчик задач 
  currentTasksCount += 1; 

  request(url, function(error, responce, body) {
    // отлавливаем ошибки и сообщаем о них
    if(error){
      console.log('Не удалось получить страницу из-за следующей ошибки: ' + error + ' ==> ' + url);
    }
    else{ 
      // загружаем тело страницы в Cheerio для работы с DOM,
      // получаем все теги ссылок со страницы
      var $ = cheerio.load(body),
          links = $("a"),
          onPage = []; // массив для всех url со страницы

      // добавляем url в done
      done[url] = i;
      i++;

      for (var j = 0; j < links.length; j++) {
        var link = links[j];
        // получаем атрибут href для каждой ссылки, если он есть
        if ($(link).attr("href")) {
          var thisUrl = $(link).attr("href");
          // нормализуем 
          thisUrl = myNormalize(url, thisUrl);

          // если нормализация возвращает не null добавляем к allUrls
          if (thisUrl !== null) {
            allUrls[thisUrl] = i;
            onPage.push(thisUrl);
          }
        }
      }

      // обходим ссылки со страницы
      async.each(onPage, function(link) {
        if (currentTasksCount < MAX_TASK_COUNT) {
          if (Object.keys(allUrls).length < LINK_COUNT) {
            grabUrl(link, allUrls);
          } else {
            if (!printed) {
              printed = true;
              printResult(allUrls);
            }
          }
        }
      });
    }
    currentTasksCount -= 1;
  }); 
}

grabUrl(domen, allUrls); 

// выводим на экран первые 1000 url из allUrls
function printResult(allUrls) {
  var k = 0;
  for (key in allUrls) {
    if(k < LINK_COUNT) {
      console.log(key);
      k += 1;
    } else {
      break;
    }
  }
  // console.timeEnd('exec time');
  // console.log('запросов: ' + i);
}

