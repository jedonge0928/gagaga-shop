/*-------------------------------top_btn-----------------------------------*/
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

/*--------------------------main_banner------------------------------------- */

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

/*------------------------페이지네에이션-----------------------------*/

const itemList = [leatherSofa, fabricSofa, storageCloset, livingRoomTable];
const sectionList = [
  document.querySelector(".leather_sofa"),
  document.querySelector(".fabric_sofa"),
  document.querySelector(".storage_closet"),
  document.querySelector(".living_room_table"),
];
const pageNavList = [
  document.querySelector(".pagination.leather"),
  document.querySelector(".pagination.fabric"),
  document.querySelector(".pagination.storage"),
  document.querySelector(".pagination.living"),
];

const itemsPerPage = 12;

function renderItems(dataArray, section, currentPage) {
  section.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  const currentItems = dataArray.slice(start, end);

  currentItems.forEach((item) => {
    const div = document.createElement("div");

    div.className = "category_all";

    if (item.link) {
      div.innerHTML = `

    <a href="${item.link}">

      <div class="category_all_img">

        <img src="${item.img}" alt="${item.title}" />

      </div>

      <div class="category_all_text">

        <p class="category_all_text_title" style="color:red">${item.title}</p>

        <p class="category_all_price">${item.price}</p>

      </div></a>

    `;
    } else {
      div.innerHTML = `

      <div class="category_all_img">

        <img src="${item.img}" alt="${item.title}" />

      </div>

      <div class="category_all_text">

        <p class="category_all_text_title">${item.title}</p>

        <p class="category_all_price">${item.price}</p>

      </div>

    `;
    }

    section.appendChild(div);
  });
}

function renderPagination(dataArray, navContainer, section, callback) {
  navContainer.innerHTML = "";

  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  let currentPage = 1;

  //전 페이지로 가기
  const prevBtn = document.createElement("button");

  prevBtn.innerHTML = `<img src="./images/icon/오른쪽.png" alt="이전">`;

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;

      updatePage();
    }
  });

  navContainer.appendChild(prevBtn);

  // 숫자

  const pageButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");

    btn.textContent = i;

    if (i === 1) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;

      updatePage();
    });

    pageButtons.push(btn);

    navContainer.appendChild(btn);
  }

  // 다음 페이지로 가기

  const nextBtn = document.createElement("button");

  nextBtn.innerHTML = `<img src="./images/icon/왼쪽.png" alt="다음">`;

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;

      updatePage();
    }
  });

  navContainer.appendChild(nextBtn);

  function updatePage() {
    pageButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index + 1 === currentPage);
    });

    callback(dataArray, section, currentPage);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  itemList.forEach((dataArray, index) => {
    const section = sectionList[index];

    const nav = pageNavList[index];

    renderItems(dataArray, section, 1);

    renderPagination(dataArray, nav, section, renderItems);
  });
});
