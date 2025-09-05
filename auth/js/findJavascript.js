document.addEventListener("DOMContentLoaded", function () {
  /*top_btn*/
  const top = document.querySelector(".top_btn");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 200) {
      top.classList.add("show");
    } else {
      top.classList.remove("show");
    }
  });

  top.addEventListener("click", function () {
    const scrollToTop = setInterval(() => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        clearInterval(scrollToTop);
      } else {
        window.scrollBy(0, -30);
      }
    });
  });

  /*main_gnb */
  const gnb = document.querySelector(".header_bottom_gnb");
  const subMenus = document.querySelectorAll(".main_gnb_sub");
  const gnbBg = document.querySelector(".gnb_bg");

  gnb.addEventListener("mouseenter", () => {
    subMenus.forEach((menu) => menu.classList.add("show"));
    gnbBg.classList.add("show");
  });

  gnb.addEventListener("mouseleave", () => {
    subMenus.forEach((menu) => menu.classList.remove("show"));
    gnbBg.classList.remove("show");
  });

  //--------------------------------------------------------------------------------------------------------

  /**fetch */

  let findUserList = [];

  const findUserFetch = async () => {
    try {
      const response = await fetch("/userData.json");

      if (!response.ok) {
        alert("데이터 실패");
        return [];
      }
      const result = await response.json();
      return result;
    } catch (err) {
      alert("에러발생");
      return [];
    }
  };

  findUserFetch().then((result) => {
    findUserList = result.user;
    console.log(findUserList);
  });

  //--------------------------------------------------------------
  const nameInput = document.querySelector(".name_input");
  const birthInput = document.querySelector(".birth_input");
  const idInput = document.querySelector(".id_input");
  const emailInput = document.querySelector(".email_input");
  const idBtn = document.querySelector(".find_id_btn");
  const pwBtn = document.querySelector(".find_pw_btn");
  const userId = document.querySelector(".user_text_id");
  const userpw = document.querySelector(".user_text_pw");

  const FindIdHandle = (e) => {
    e.preventDefault();
    const userInfor = findUserList.find(
      (user) => user.name === nameInput.value && user.birth === birthInput.value
    );
    if (userInfor) {
      userId.textContent = `사용자의 아이디는 ${userInfor.id}입니다.`;
    } else {
      const usedPop = document.createElement("div");
      usedPop.setAttribute("class", "user_pop");
      usedPop.textContent = "존재하지않는 유저입니다.";
      usedPop.classList.add("user_pop");
      document.body.appendChild(usedPop);
      idInput.select();
      setTimeout(() => {
        usedPop.remove();
      }, 1000);
    }
  };

  const FindPwHandle = (e) => {
    e.preventDefault();

    const userInfor = findUserList.find(
      (user) =>
        user.id === idInput.value.trim() &&
        user.emailId + "@" + user.domain === emailInput.value.trim()
    );
    if (userInfor) {
      userpw.textContent = `사용자의 비밀번호는 ${userInfor.pw}입니다.`;
    } else {
      const usedPop = document.createElement("div");
      usedPop.setAttribute("class", "user_pop");
      usedPop.textContent = "정보가 일치하지 않습니다.";
      usedPop.classList.add("user_pop");
      document.body.appendChild(usedPop);
      idInput.select();
      setTimeout(() => {
        usedPop.remove();
      }, 1000);
    }
  };

  idBtn.addEventListener("click", FindIdHandle);
  pwBtn.addEventListener("click", FindPwHandle);
});
