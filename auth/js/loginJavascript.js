/*main_gnb*/

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

/*비밀번호 보이기*/
const eyeBtn = document.querySelector(".eye");
const passInput = document.querySelector(".login_pass input");

eyeBtn.addEventListener("click", () => {
  const type = passInput.type === "password" ? "text" : "password";
  passInput.type = type;
  eyeBtn.classList.toggle("show");
});
//------------------------------------------------------------------------
let userList = [];
let guestList = [];

const arriveDay = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${month}월 ${date}일 ${week[day]}요일 도착 예정입니다.`;
};
const List = async () => {
  try {
    const response = await fetch("/userData.json");
    const result = await response.json();

    userList = result.user;
    guestList = result.guest.map((list) => ({
      ...list,
      arrive: arriveDay(),
    }));

    console.log(userList);
    console.log(guestList);
  } catch (error) {
    console.error(error);
  }
};
List();

/*로그인*/
const loginBtn = document.querySelector(".login button");
const inputId = document.querySelector(".login_id input");
const inputPw = document.querySelector(".login_pass input");
const loginFalse = document.querySelector(".login_false_bg");
const closeBtn = document.querySelector(".close_btn");
const logoutBtn = document.querySelector(".login_logout_btn");

let falseLoginCount = 0;

const setUser = (user) => {
  localStorage.setItem("loginUser", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("loginUser"));
};

const login = async () => {
  const response = await fetch("/userData.json");
  const result = await response.json();

  const userId = inputId.value.trim();
  const userPw = inputPw.value.trim();

  const newUser = JSON.parse(localStorage.getItem("newUsers")) || [];
  const allUser = [...result.user, ...newUser];
  const user = allUser.find((user) => user.id == userId && user.pw === userPw);

  if (user) {
    setUser(user);
    alert("로그인이 완료되었습니다.");
    location.href = "../index.html";
  } else if (userId === "" || userPw === "") {
    alert("아이디와 비밀번호를 입력해주세요");
  } else {
    falseLoginCount++;
    alert("아이디 또는 비밀번호가 틀렸습니다.");
    inputId.focus();

    if (falseLoginCount > 4) {
      loginFalse.style.display = "block";
    }
  }
};

/*로그아웃*/

const logout = () => {
  localStorage.removeItem("loginUser");

  location.href = "../index.html";
};
/**페이지닫기btn*/
const handleCloseBtn = (e) => {
  loginFalse.style.display = "none";
  orderPop.style.display = "none";
};

closeBtn.addEventListener("click", handleCloseBtn);
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

/*비회원 주문조회*/

const orderId = document.querySelector(".order_inquiry_id input");
const orderPw = document.querySelector(".order_inquiry_pass input");
const orderBtn = document.querySelector(".order_inquiry form button");

const orderPop = document.querySelector(".order_pop_bg");
const orderText = document.querySelector(".order_text");
const orderTextName = document.querySelector(".order_name");

const orderCheck = () => {
  const guestId = orderId.value.trim();
  const guestPw = orderPw.value.trim();

  const CheckOrder = guestList.find(
    (guest) => guest.name === guestId && guest.pw === guestPw
  );

  if (CheckOrder) {
    const CheckOrderName = CheckOrder.name;
    const productList = CheckOrder.product.join("");
    const arriveDate = CheckOrder.arrive;

    orderPop.style.display = "flex";
    orderTextName.textContent = `${CheckOrderName}의 `;
    orderText.textContent = `${productList}(이)가  ${arriveDate}`;
  } else {
    alert("주문정보가 일치하지 않습니다.");
  }
};
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  orderCheck();
});
