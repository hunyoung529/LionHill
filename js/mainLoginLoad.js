$(document).ready(function () {
  // Google 로그인 스크립트 로드

  // Kakao 로그인 스크립트 로드
  $.getScript("./js/mainLogin.js", function () {
    console.log("Kakao login script loaded.");
    // Kakao 스크립트 로드 완료 후 Kakao 로그인 초기화
    doKakaoLogin();
  });

  $.getScript("https://accounts.google.com/gsi/client", function () {
    google.accounts.id.initialize({
      client_id:
        "838540086384-7p0bi00jsaprpg63b2h58kv937h8of4f.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      $("#buttonDiv")[0], // jQuery 선택자로 선택된 DOM 요소를 넘김
      { theme: "outline", size: "large" } // 버튼의 커스터마이제이션 속성
    );

    google.accounts.id.prompt(); // One Tap UI도 표시
  });
});
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
}
//로그인 API

function doKakaoLogin() {
  if (!Kakao.isInitialized()) {
    // Kakao SDK가 아직 초기화되지 않았다면 초기화 실행
    Kakao.init("0f820b109106ea2b1ee73e0020f60ad5");
  }
  console.log(Kakao.isInitialized());
}
function kakaoLogin() {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
//구글
// function init() {
//   gapi.load("auth2", function () {
//     gapi.auth2.init();
//     options = new gapi.auth2.SigninOptionsBuilder();
//     options.setPrompt("select_account");
//     // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
//     options.setScope(
//       "email profile openid https://www.googleapis.com/auth/user.birthday.read"
//     );
//     // 인스턴스의 함수 호출 - element에 로그인 기능 추가
//     // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
//     gapi.auth2
//       .getAuthInstance()
//       .attachClickHandler("GgCustomLogin", options, onSignIn, onSignInFailure);
//   });
// }
// function onSignIn(googleUser) {
//   var access_token = googleUser.getAuthResponse().access_token;
//   $.ajax({
//     // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
//     url: "https://people.googleapis.com/v1/people/me",
//     // key에 자신의 API 키를 넣습니다.
//     data: {
//       personFields: "birthdays",
//       key: "AIzaSyDlGUZNRJZ-_CYec_5xsY2D8ZmlNu3Np_Y",
//       access_token: access_token,
//     },
//     method: "GET",
//   })
//     .done(function (e) {
//       //프로필을 가져온다.
//       var profile = googleUser.getBasicProfile();
//       console.log(profile);
//     })
//     .fail(function (e) {
//       console.log(e);
//     });
// }
// function onSignInFailure(t) {
//   console.log(t);
// }
