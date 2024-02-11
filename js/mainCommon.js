$(document).ready(function () {
  $.get("./common/mainCommon.html", function (data) {
    var headerContent = $(data).filter("header").html();
    var footerContent = $(data).filter("footer").html();

    $("header").html(headerContent);
    $("footer").html(footerContent);

    headerMotion1();
    headerMotion2();
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

  //헤더에 있는 로그인 버튼 누르면 팝업 띄우기==================================
  const toggleLogin = document.querySelector(".login_backg");
  document.getElementById("headerLogin").addEventListener("click", function () {
    if (!alreadyLogin && kakaoKeys.length === 0) {
      //로그아웃 버튼일때는 팝업 띄우지 않기
      toggleLogin.classList.add("active");
    }
  });
  //모바일 헤더에 있는 로그인 버튼 누르면 팝업 띄우기==================================
  document
    .getElementById("headerLoginM")
    .addEventListener("click", function () {
      if (!alreadyLogin && kakaoKeys.length === 0) {
        //로그아웃 버튼일때는 팝업 띄우지 않게
        toggleLogin.classList.add("active");
      }
    });
  //창 닫기 누르면 팝업 꺼지기==================================
  document.getElementById("closeBtn").addEventListener("click", function () {
    toggleLogin.classList.remove("active");
  });
});
