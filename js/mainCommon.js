$(document).ready(function () {
  $.get("./common/mainCommon.html", function (data) {
    var headerContent = $(data).filter("header").html();
    var footerContent = $(data).filter("footer").html();

    $("header").html(headerContent);
    $("footer").html(footerContent);

    headerMotion1();
    headerMotion2();
    afterContentLoad();
  });

  function headerMotion2() {
    const elMenu = document.querySelector(".menu_btn"),
      elS3Nav = document.querySelector(".menu_show");
    elMenu.onclick = function () {
      if (elS3Nav.classList.contains("active")) {
        $("body").css("overflow-y", "scroll");
        elS3Nav.style.height = "-100%";
        setTimeout(function () {
          elS3Nav.classList.remove("active");
          elS3Nav.style.color = "transparents";
        }, 30);
      } else {
        elS3Nav.classList.add("active"), $("body").css("overflow-y", "hidden");
        elS3Nav.style.display = "flex";
        setTimeout(function () {
          elS3Nav.style.height = "100vh";
        }, 30);
      }
    };
  }
  function headerMotion1() {
    let pos = { y: 0, y2: 0, status: true };

    window.addEventListener("scroll", function () {
      pos.y = window.pageYOffset;
      // 삼항연산자
      pos.status = pos.y > pos.y2 ? true : false;
      pos.y2 = pos.y;

      if (pos.status) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  }
  function afterContentLoad() {
    const alreadyLogin = sessionStorage.getItem("user");
    const toggleLogin = document.querySelector(".login_backg");
    const localStorageKeys = Object.keys(localStorage);
    const kakaoKeys = localStorageKeys.filter((key) => key.startsWith("kakao"));
    //헤더에 있는 로그인 버튼 누르면 팝업 띄우기==================================
    function togglePopup(action) {
      if (action === "open") {
        if (!alreadyLogin && kakaoKeys.length === 0) {
          toggleLogin.classList.add("active");
        }
      } else if (action === "close") {
        toggleLogin.classList.remove("active");
      }
    }

    // 로그인 및 로그아웃 버튼 이벤트 핸들러
    $(document).on("click", "#headerLogin, #headerLoginM", function () {
      togglePopup("open");
    });

    $(document).on("click", "#closeBtn", function () {
      togglePopup("close");
    });

    //로그인 페이지

    //로그인 정보 로컬에 있는 회원 정보랑 일치하는지 확인하기==================
    $("#loginButton").on("click", function () {
      var inputEmail = document.getElementById("emailField").value;
      var inputPassword = document.getElementById("passwordField").value;

      // 로컬 스토리지에서 회원 정보 가져오기
      var storedUsers = JSON.parse(localStorage.getItem("userInfos"));

      if (storedUsers) {
        var userFound = false;
        for (var i = 0; i < storedUsers.length; i++) {
          var user = storedUsers[i];
          if (user.email === inputEmail && user.password === inputPassword) {
            // 이메일과 비밀번호가 일치하는 경우
            userFound = true;
            alert(`${user.name}님! 환영합니다!`);
            //세션에 로그인 정보 기록
            const userInfoSession = {
              email: `${user.email}`,
              name: `${user.name}`,
              phoneNumber: `${user.phoneNumber}`,
            };
            sessionStorage.setItem(`user`, JSON.stringify(userInfoSession));
            window.location.href = "./index.html";
            break;
          }
        }
        if (!userFound) {
          alert("로그인 실패. 이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      } else {
        alert("회원 정보가 없습니다. 먼저 회원 가입을 해주세요.");
      }
    });
    //세션에 값이 있을 경우(=로그인 중) 로그인 버튼=>로그아웃으로=======================

    //카카오 로그인은 값이 로컬에 저장되네요....====

    const loginBtnChange = document.getElementById("logInOut");
    const loginBtnChangeM = document.getElementById("logInOutM");

    if (alreadyLogin || kakaoKeys.length > 0) {
      loginBtnChange.textContent = `로그아웃`;
      loginBtnChangeM.textContent = `로그아웃`;

      // 로그아웃 버튼 클릭 시 세션 스토리지에서 값을 제거
      loginBtnChange.addEventListener("click", function (e) {
        sessionStorage.removeItem("user");
        kakaoKeys.forEach((key) => {
          localStorage.removeItem(key);
        });
        window.location.href = "./index.html";
      });

      loginBtnChangeM.addEventListener("click", function (e) {
        sessionStorage.removeItem("user");
        kakaoKeys.forEach((key) => {
          localStorage.removeItem(key);
        });
        window.location.href = "./index.html";
      });
    }
  }
});
