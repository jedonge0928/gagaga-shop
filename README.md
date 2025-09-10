# 가가가 - 가구 쇼핑몰 홈페이지  
> **가: 집에 가치를 더하다**

---

## 주요 기능

###  메인 페이지

- 상단 이동 버튼 (`scrollTopButton`)

```
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
```


-메인배너 슬라이드

```
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
```


### 서브 페이지 (상품 목록) -


기능 :  동적 페이지 버튼 생성 => 	데이터 길이에 따라 자동 계산
```
  navContainer.innerHTML = "";

  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  let currentPage = 1;

```
- 주요 구성 요소

itemList: 각 상품 카테고리 데이터 배열 (ex. leatherSofa, fabricSofa 등). :  const itemList = [leatherSofa, fabricSofa, storageCloset, livingRoomTable];

sectionList: 각 카테고리에 해당하는 DOM 영역. 
```
:const sectionList = [
  document.querySelector(".leather_sofa"),
  document.querySelector(".fabric_sofa"),
  document.querySelector(".storage_closet"),
  document.querySelector(".living_room_table"),
];

pageNavList: 각 카테고리별 페이지네이션 버튼 영역.

const pageNavList = [
  document.querySelector(".pagination.leather"),
  document.querySelector(".pagination.fabric"),
  document.querySelector(".pagination.storage"),
  document.querySelector(".pagination.living"),
];


```


페이지 버튼(숫자, 이전/다음 버튼) 생성.

/*이전*/

```
 -const prevBtn = document.createElement("button");

  prevBtn.innerHTML = `<img src="./images/icon/오른쪽.png" alt="이전">`;

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;

      updatePage();
    }
  });

  navContainer.appendChild(prevBtn);
```
 /*숫자*/
 ```
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

  ```
 /*다음*/
```
  const nextBtn = document.createElement("button");

  nextBtn.innerHTML = `<img src="./images/icon/왼쪽.png" alt="다음">`;

  nextBtn.addEventListener("click", () => {
  
    if (currentPage < totalPages) {
    
      currentPage++;
      
      updatePage();
      
    }
    
  });
  
  navContainer.appendChild(nextBtn);
```







### 상세 페이지

- 사용자가 작성한 리뷰는 `localStorage`에 저장되며, 이미지, 별점, 제목, 텍스트를 포함합니다.

- **작성 후 자동 렌더링**, **수정 시 값 채워짐**, **삭제 시 해당 항목 제거** 기능 구현.

-리뷰 작성 기능 (localStorage 저장)


### 1.리뷰구조

```
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
```

  
### 2.리뷰 수정(find) =>  const item = data.find((item) => item.id === id);  
      ```
       let editId = null; 
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
      });
    });
      ```
      
### 3. 리뷰 삭제(filter) => const deleteData = data.filter((item) => item.id !== id);
      
```
   const deleteBtn = document.querySelectorAll(".delete_btn");

    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.closest(".reviewBox").dataset.id);
        const data = JSON.parse(localStorage.getItem("reviewList")) || [];
        const deleteData = data.filter((item) => item.id !== id);
        localStorage.setItem("reviewList", JSON.stringify(deleteData));
        originalRender();
      });
    });
  };

```

###  로그인 / 회원가입

 #### `data.json`을 활용한 유저 데이터 처리

```
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

  ```
<br />

  #### 1.아이디 찾기(이름과 생년월일 정보가 일치할 시)

  ```
  const userInfor = findUserList.find((user) => user.name === nameInput.value && user.birth === birthInput.value);
```

   
  #### 2.비밀번호 찾기(유저 아이디와 이메일 정보가 일치할 시)


    const userInfor = findUserList.find((user) =user.id === idInput.value.trim() &&`${user.emailId}@${user.domain}` === emailInput.value.trim());
    

 #### 프로필 이미지 업로드

```
const profileInput = document.getElementById("profileImage");
  const previewImg = document.querySelector(".previewImage");

  profileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    previewImg.src = URL.createObjectURL(file);
  });

```
 다음 주소 검색 API 연동
```
  const adressNumber = document.querySelector(".adress_number_box");
  const adressNumberBtn = document.querySelector(".adress_number button");
  const adress = document.querySelector(".adress");
  const adressDetail = document.querySelector(".adress_detail");

  const onClickSearch = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        adressNumber.value = data.zonecode;
        adress.value = data.address;
      },
    }).open();
  };

  adressNumberBtn.addEventListener("click", onClickSearch);

  adressDetail.addEventListener("change", (e) => {
    adressDetail.value = e.target.value;
  });

```


##  배포

- **닷홈(dothome)** 웹호스팅을 활용하여 배포 완료
- 
- HTML/CSS/JS/images 등의 정적 파일을 직접 업로드하여   **브라우저에서 사용자 접근 가능**

 
## 설계 및 구현에서 배운 점

###  레이아웃 구성 능력 향상

- Flexbox를 활용해 구조적인 레이아웃을 구성하고,
  
  다양한 화면 크기에서도 자연스럽게 보이도록 설계

###  Vanilla JS 기반 UI 기능 구현

- 순수 JS만으로 DOM 제어, 이벤트 바인딩, 클래스 조작 등 구현

-scrollTop 버튼, 탭 UI, 슬라이더 등의 UX 중심 기능 직접 설계


###  LocalStorage를 통한 데이터 저장/관리

- 로그인/회원가입, 리뷰 작성 등 사용자 데이터를 `localStorage`에 저장

- JSON 직렬화/파싱 과정을 통해 클라이언트 상태 유지 학습


###  외부 API 연동

- 다음 주소 검색 API를 활용해 실제 사용자 입력 경험

---

## 회고

이 프로젝트를 통해 HTML/CSS 레이아웃 설계 능력과 Vanilla JS를 이용한 동적 기능 구현 경험을 쌓을 수 있었습니다.  
특히 로그인과 회원가입 기능을 직접 설계하면서, 사용자의 입력값에 대해 다양한 조건문을 활용한 예외 처리를 구현해볼 수 있었습니다.
또한, 외부 API와의 연동을 통해 실제 데이터 흐름을 경험했고, 사용자가 입력한 form 데이터를 브라우저의 localStorage에 저장하고 불러오는 과정을 통해 클라이언트 측 상태 관리에 대한 이해도를 높일 수 있었습니다.
그 외에도, 기존에 잘 알지 못했던 이미지 업로드 기능을 구현해보며 FileReader를 사용한 base64 인코딩 처리 및 미리보기 기능도 직접 다뤄볼 수 있었습니다.
전체적으로 사용자 데이터의 흐름과 저장 구조, 예외 상황 처리 등 프론트엔드 사용자 인증 프로세스의 전반적인 구조를 실습하며 큰 성장을 얻을 수 있었습니다.

## 프로젝트 링크 (옵션)

- [🔗 배포된 사이트 바로가기](http://jedongkim95.dothome.co.kr/)








# 모아보기


https://github.com/user-attachments/assets/cd56b2d6-9df9-4c43-b58d-df90c86f4ffb


https://github.com/user-attachments/assets/8b7897dc-4091-4cdb-9187-dac6a7a581f9


https://github.com/user-attachments/assets/dfc9680a-1e74-4714-a8ad-a5c68bd5cbf7


https://github.com/user-attachments/assets/65ec48d3-8d08-4801-b5dc-58082b20f195


https://github.com/user-attachments/assets/8ced5885-1b8a-4fbb-893c-82c29f853a70


https://github.com/user-attachments/assets/97c35150-96bf-4068-91c6-25c8335ee5cc

