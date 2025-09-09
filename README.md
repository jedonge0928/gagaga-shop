# 가가가 - 가구 쇼핑몰 홈페이지  
> **가: 집에 가치를 더하다**


- **HTML**

- **CSS** (Flexbox 중심 레이아웃)
 
- **JavaScript** (Vanilla JS)
 
- **daum 주소 검색 API**

- **LocalStorage** / JSON 파일

---

## 주요 기능

###  메인 페이지

- 상단 이동 버튼 (`scrollTopButton`)
  
- 탭 전환 UI (카테고리, 추천 상품 등)

-메인배너 슬라이드

-.banner_left_img 클래스를 가진 모든 슬라이드 이미지 요소들을 선택 : const slides = document.querySelectorAll(".banner_left_img");

-현재 보여줄 슬라이드의 인덱스를 추적하는 변수 : let current = 0;

-슬라이드가 전환되는 시간 : const intervalTime = 3000;

-모든 슬라이드에서 active 클래스를 제거한 뒤, 전달받은 index의 슬라이드에만 active 클래스를 추가

<img width="517" height="439" alt="image" src="https://github.com/user-attachments/assets/337bde67-9e10-428e-8d01-077a4e34ca0d" />







### 서브 페이지 (상품 목록) -


기능 :  동적 페이지 버튼 생성 => 	데이터 길이에 따라 자동 계산

  navContainer.innerHTML = "";

  const totalPages = Math.ceil(dataArray.length / itemsPerPage);

  let currentPage = 1;


- 주요 구성 요소

itemList: 각 상품 카테고리 데이터 배열 (ex. leatherSofa, fabricSofa 등). :  const itemList = [leatherSofa, fabricSofa, storageCloset, livingRoomTable];

sectionList: 각 카테고리에 해당하는 DOM 영역. 

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

renderPagination(dataArray, navContainer, section, callback)

페이지 버튼(숫자, 이전/다음 버튼) 생성.

/*이전*/
 -const prevBtn = document.createElement("button");

  prevBtn.innerHTML = `<img src="./images/icon/오른쪽.png" alt="이전">`;

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;

      updatePage();
    }
  });

  navContainer.appendChild(prevBtn);

 /*숫자*/
 
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

  
 /*다음*/

  const nextBtn = document.createElement("button");

  nextBtn.innerHTML = `<img src="./images/icon/왼쪽.png" alt="다음">`;

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;

      updatePage();
    }
  });

  navContainer.appendChild(nextBtn);








### 상세 페이지

-제품 이미지 선택

<img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/8dbe8570-87a6-4e68-afba-a970a54398c1" />


- 리뷰 작성 기능 (localStorage 저장)

<br/>

### 1.리뷰구조

<br/>

<img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/74354a72-2a48-4299-9bb0-9abd7893af24" />

  
### 2.리뷰 수정(find) =>  const item = data.find((item) => item.id === id);
      
      
      
### 3. 리뷰 삭제(filter) => const deleteData = data.filter((item) => item.id !== id);
      









 

###  로그인 / 회원가입

- `data.json`을 활용한 유저 데이터 처리


<img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/8e5f9b9e-bd84-4dd1-9eed-48aa3060bd04" />

  
     1.아이디 찾기(이름과 생년월일 정보가 일치할 시)


     1) const userInfor = findUserList.find((user) => user.name === nameInput.value && user.birth === birthInput.value);

   
   2.비밀번호 찾기(유저 아이디와 이메일 정보가 일치할 시)


     1)const userInfor = findUserList.find((user) =user.id === idInput.value.trim() &&`${user.emailId}@${user.domain}` === emailInput.value.trim());


 프로필 이미지 업로드


 <img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/39654b14-cee5-4b16-9efe-9bd1e7f30698" />


 다음 주소 검색 API 연동


 <img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/51383868-68e7-413e-9f16-69ad9911d6b2" />


- (회원가입form)입력 정보는 localStorage에 저장 및 유지


<img  width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/e523e51b-f8d7-4f2a-ac99-ba65e48000f5" />


이때 newUser는 input에 입력한 값을 말합니다.

---

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

- 다음 주소 검색 API를 활용해 실제 사용자 입력 경험 개선

---

## 회고

이 프로젝트를 통해 HTML/CSS 레이아웃 설계 능력과 Vanilla JS를 이용한 동적 기능 구현 경험을 쌓을 수 있었습니다.  
특히 로그인과 회원가입 기능을 직접 설계하면서, 사용자의 입력값에 대해 다양한 조건문을 활용한 예외 처리를 구현해볼 수 있었습니다.
또한, 외부 API와의 연동을 통해 실제 데이터 흐름을 경험했고, 사용자가 입력한 form 데이터를 브라우저의 localStorage에 저장하고 불러오는 과정을 통해 클라이언트 측 상태 관리에 대한 이해도를 높일 수 있었습니다.
그 외에도, 기존에 잘 알지 못했던 이미지 업로드 기능을 구현해보며 FileReader를 사용한 base64 인코딩 처리 및 미리보기 기능도 직접 다뤄볼 수 있었습니다.
전체적으로 사용자 데이터의 흐름과 저장 구조, 예외 상황 처리 등 프론트엔드 사용자 인증 프로세스의 전반적인 구조를 실습하며 큰 성장을 얻을 수 있었습니다.

## 프로젝트 링크 (옵션)

- [🔗 배포된 사이트 바로가기](http://jedongkim95.dothome.co.kr/)

---

