/*top_btn*/
document.addEventListener("DOMContentLoaded", function () {
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
});
/*main_gnb */
document.addEventListener("DOMContentLoaded", function () {
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
});

/*main_banner */

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".banner_left_img");
  let current = 0;
  const intervalTime = 3000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function startSlider() {
    showSlide(current);
    current = (current + 1) % slides.length;
  }
  showSlide(current);
  setInterval(startSlider, intervalTime);
});
/*로그인 로그아웃 상태*/
const loginName = document.querySelector(".login_name");
const authBtn = document.querySelector(".login_logout_btn");

const loginUser = JSON.parse(localStorage.getItem("loginUser"));
authBtn.style.cursor = "pointer";

console.log(loginUser);
if (loginUser) {
  authBtn.textContent = "로그아웃";
  loginName.textContent = loginUser.id;
  loginName.style.display = "block";
} else {
  authBtn.textContent = "로그인/회원가입";
  loginName.style.display = "none";
}
console.log(loginUser, "lognuser");
const authCheck = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (loginUser) {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("loginUser");
    location.href = "./index.html";
  } else {
    location.href = "./login.html";
  }
};

authBtn.addEventListener("click", authCheck);
