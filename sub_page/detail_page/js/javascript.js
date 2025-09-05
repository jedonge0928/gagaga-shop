/*------------------------------top_btn----------------------------------*/
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
        window.scrollBy(0, -100);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
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

  const detailMenus = document.querySelector(".detail_page_menu");
  const offsetTop = detailMenus.offsetTop;
  window.addEventListener("scroll", function () {
    if (window.scrollY >= offsetTop) {
      detailMenus.classList.add("sticky");
    } else {
      detailMenus.classList.remove("sticky");
    }
  });
});

/*제품수량 및 금액변경 */

document.addEventListener("DOMContentLoaded", function () {
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  const result = document.querySelector("#num_result");
  const totalPrice = document.querySelector(".total_price");
  let i = 1;

  plus.addEventListener("click", function () {
    i++;
    result.textContent = i;
    let totalPriceNum = i * 39000;
    totalPrice.textContent = totalPriceNum.toLocaleString() + `원`;
  });
  minus.addEventListener("click", function () {
    if (i > 0) {
      i--;
      result.textContent = i;
      let totalPriceNum = i * 39000;
      totalPrice.textContent = totalPriceNum.toLocaleString() + `원`;
    } else {
      totalPrice.textContent = 0;
    }
  });
});
/*-------------------------------input_box------------------------------------- */
const optionValue = document.querySelector(".option_select_value");
const optionItem = document.querySelectorAll(".option_list_select");
const optionList = document.querySelector(".option_list");

optionItem.forEach((item) => {
  item.addEventListener("click", () => {
    optionValue.textContent = item.textContent;
    optionList.style.display = "none";
  });
});

/*--------------------------option-------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("reviewList");

  const imgInput = document.getElementById("img_select");
  let selectedImage = null;
  let editId = null;

  // 이미지 선택
  const imgFilename = document.getElementById("img_filename");

  let addImg = () => {
    const file = imgInput.files[0];
    if (!file) {
      imgFilename.textContent = "";
      selectedImage = null;
      return;
    }

    imgFilename.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  imgInput.addEventListener("change", () => addImg());

  /*렌더*/
  const originalRender = () => {
    const reviewList = document.querySelector(".list_slide");
    const dataList = JSON.parse(localStorage.getItem("reviewList")) || [];

    reviewList.innerHTML = "";
    dataList.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="reviewBox" data-id="${item.id}">
          <div class="review_img">
            ${item.img ? `<img src="${item.img}" />` : "이미지 없음"}
          </div>
          <div class="review_text_box">
          <div class="review_star">${"⭐".repeat(item.star)}</div>
          <div class="review_title">${item.title}</div>
          <div class="review_text">${item.text}</div>
          <div class="review_actions">
            <button class="edit_btn">수정</button>
            <button class="delete_btn">삭제</button>
          </div>
          </div>
        </div>
      `;
      reviewList.appendChild(div);
    });
    /**리뷰슬라이드버튼**/
    const prevBtn = document.querySelector(".prev_btn");
    const nextBtn = document.querySelector(".next_btn");
    const listSlide = document.querySelector(".list_slide");

    const isScrollable = listSlide.scrollWidth > listSlide.clientWidth;

    nextBtn.addEventListener("click", () => {
      listSlide.scrollBy({ left: 260, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      listSlide.scrollBy({ left: -260, behavior: "smooth" });
    });

    if (isScrollable) {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }

    // 수정

    const titleInput = document.querySelector(".title");
    const textInput = document.querySelector(".text");
    const selectStar = document.querySelector(".star_select");
    const reviewBtn = document.querySelector(".review_btn");

    const editBtn = document.querySelectorAll(".edit_btn");

    editBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.closest(".reviewBox").dataset.id);
        const data = JSON.parse(localStorage.getItem("reviewList")) || [];
        const item = data.find((item) => item.id === id);
        if (!item) return;

        titleInput.value = item.title;
        textInput.value = item.text;
        selectStar.value = item.star;
        reviewBtn.textContent = "수정 완료";

        selectedImage = item.img || null;
        editId = id;
        scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // 삭제
    const deleteBtn = document.querySelectorAll(".delete_btn");

    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.closest(".reviewBox").dataset.id);
        const data = JSON.parse(localStorage.getItem("reviewList")) || [];
        const newData = data.filter((item) => item.id !== id);
        localStorage.setItem("reviewList", JSON.stringify(newData));
        originalRender();
      });
    });
  };

  /*리뷰*/

  const titleInput = document.querySelector(".title");
  const textInput = document.querySelector(".text");
  const selectStar = document.querySelector(".star_select");
  const reviewBtn = document.querySelector(".review_btn");

  /*form*/
  reviewBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const star = Number(selectStar.value);
    if (!title || !text || !star) {
      alert("내용을 입력해주세요");
      return;
    }

    const data = JSON.parse(localStorage.getItem("reviewList")) || [];

    if (editId) {
      const index = data.findIndex((item) => item.id === editId);
      if (index !== -1) {
        data[index] = {
          ...data[index],
          title,
          text,
          star,
          img: selectedImage,
        };
      }
      editId = null;
    } else {
      const newReview = {
        id: Date.now(),
        title,
        text,
        star,
        img: selectedImage,
      };
      data.push(newReview);
    }

    localStorage.setItem("reviewList", JSON.stringify(data));

    titleInput.value = "";
    textInput.value = "";
    selectStar.selectedIndex = 0;
    imgInput.value = "";
    selectedImage = null;
    imgFilename.textContent = "";

    originalRender();
  });
});
