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
  
- Swiper.js를 활용한 이미지 슬라이더

### 서브 페이지 (상품 목록)

- 상품 데이터 출력 (배열 map 반복)
  
- 페이지네이션 기능 구현
  
- `input:checked`를 활용한 탭 전환
  
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/70b61a97-f42e-4e76-8cb5-f57bb54dce12" />

<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/b9578e7c-143e-4639-945b-39447dd1fca2" />

<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/263b1f3f-5fcd-4dac-80c7-03be3991d663" />

<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/f70062c0-c0f0-435e-b1c2-e5b86a032946" />

<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/72585980-4bdf-4dd8-8264-1e3a420bac2e" />

- 주요 구성 요소

itemList: 각 상품 카테고리 데이터 배열 (ex. leatherSofa, fabricSofa 등).

sectionList: 각 카테고리에 해당하는 DOM 영역.

pageNavList: 각 카테고리별 페이지네이션 버튼 영역.

renderPagination(dataArray, navContainer, section, callback)

페이지 버튼(숫자, 이전/다음 버튼) 생성.

페이지 클릭 시 renderItems 호출하여 해당 페이지 데이터 출력.

현재 페이지는 .active 클래스 적용.

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
      

 수량 조절 (숫자 증감 버튼)
 
 옵션 선택 시 텍스트 동적 변경

 `input:checked` 기반 탭 구조

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

