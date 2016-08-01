(function () {
  // on redy
  document.addEventListener('DOMContentLoaded', function(event) { 
    scaleFont();
  });
  // on resize
  window.addEventListener('resize', function(event){
    scaleFont();
  }, true);

  function scaleFont() {

    var viewPortWidth = window.innerWidth;

    var html = document.querySelector('html');
    if (viewPortWidth >= 1400) {html.setAttribute('style', 'font-size: 24px;');}
    else if (viewPortWidth >= 1000) {html.setAttribute('style', 'font-size: 18px;');}
    else  {html.setAttribute('style', 'font-size: 14px;');}

  }
}());
