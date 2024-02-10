var googleInitialized = false;
var kakaoInitialized = false;

jQuery(document).ready(function ($) {
  $("body").prepend('<article class="loginPopup"></article>');
  $(".loginPopup").load("../sub/login.html", function () {
    $.getScript("../js/login.js", function () {
      if (!kakaoInitialized) {
        doKakaoLogin();
      }
    });

    $.getScript("https://apis.google.com/js/platform.js", function () {
      if (!googleInitialized) {
        init();
      }
    });
  });
});

function doKakaoLogin() {
  if (!kakaoInitialized) {
    Kakao.init("0f820b109106ea2b1ee73e0020f60ad5");
    kakaoInitialized = true;
  }
  console.log(Kakao.isInitialized());
}

function init() {
  if (!googleInitialized) {
    gapi.load("auth2", function () {
      gapi.auth2.init();
      googleInitialized = true;
    });
  }
}
