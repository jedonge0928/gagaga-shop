document.addEventListener("DOMContentLoaded", () => {
  let userData = [];

  const userDataFetch = async () => {
    try {
      const response = await fetch("/userData.json");
      if (!response.ok) {
        alert("데이터 로딩 실패");
        return [];
      }
      const result = await response.json();
      return result;
    } catch (err) {
      alert("에러 발생");
    }
  };

  userDataFetch().then((result) => {
    userData = result.user;
  });

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

  /* --- top 버튼 --- */
  const topBtn = document.querySelector(".top_btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 200) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
  });

  topBtn.addEventListener("click", () => {
    const scrollToTop = setInterval(() => {
      if (window.scrollY <= 0) clearInterval(scrollToTop);
      else window.scrollBy(0, -30);
    }, 10);
  });

  /* --- 메인 GNB --- */
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

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* --- 프로필 이미지 미리보기 --- */
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

  /* --- 이메일 관련 --- */
  const emailId = document.querySelector("#email");
  const domainInput = document.querySelector(".domain_input");
  const emailCheckBtn = document.querySelector(".email_check_btn");
  const idInput = document.querySelector(".id_auth");
  const optionBox = document.querySelector(".option_custom");
  const selectDomainOptions = document.querySelectorAll(".option_custom div");
  const selectDomainArrowDown = document.querySelector(
    ".select_domain_input i:nth-child(2)"
  );
  const allDomains = ["naver.com", "daum.net", "google.com"];

  emailCheckBtn.addEventListener("click", () => {
    const emailIdValue = emailId.value.trim();
    const domainValue = domainInput.value.trim().toLowerCase();

    const foundUser = userData.find(
      (user) => user.emailId === emailIdValue && user.domain === domainValue
    );

    if (!emailIdValue || !domainValue) {
      alert("이메일을 모두 입력해주세요.");
      return;
    }

    if (!allDomains.includes(domainValue)) {
      alert("도메인을 입력해주세요");
      return;
    }

    if (!foundUser) {
      alert("사용 가능한 이메일입니다.");
      idInput.focus();
    } else {
      alert("이미 가입된 이메일입니다.");
      emailId.select();
    }
  });

  selectDomainOptions.forEach((option) => {
    option.addEventListener("click", () => {
      domainInput.value = option.textContent;
      optionBox.classList.remove("showing");
    });
  });

  selectDomainArrowDown.addEventListener("click", () => {
    optionBox.classList.toggle("showing");
  });

  /* --- 아이디 중복 체크 --- */
  const idInputBtn = document.querySelector(".id_box button");
  const idText = document.querySelector(".id_text");

  function idCheckHandle() {
    const value = idInput.value.trim();
    let used = userData.some((m) => m.id === value);

    if (used) {
      showPopup("이미 사용 중인 아이디입니다.", "user_pop", 1000);
      idInput.select();
      idText.textContent = "";
    } else if (value.length >= 5 && value.length <= 16) {
      idText.textContent = "사용가능한 아이디입니다.";
      idText.style.color = "blue";
    } else {
      idText.textContent = "사용불가능한 아이디입니다.";
      idText.style.color = "red";
    }
  }

  idInputBtn.addEventListener("click", idCheckHandle);

  /* --- 비밀번호 체크 --- */
  const passwordInput = document.querySelector(".password_input input");
  const passwordText = document.querySelector(".password_text");
  const passwordInput2 = document.querySelector(".password__check_input");

  function passwordCheckHandle() {
    const pw = passwordInput.value.trim();
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);

    if (pw.length < 8 || pw.length > 16) {
      passwordText.textContent = "비밀번호는 8~16자 사이여야 합니다.";
      passwordText.style.color = "red";
    } else if (!hasSpecialChar) {
      passwordText.textContent = "비밀번호에 특수문자를 포함해야 합니다.";
      passwordText.style.color = "red";
    } else {
      passwordText.textContent = "사용 가능한 비밀번호입니다.";
      passwordText.style.color = "blue";
    }
  }

  function passwordCheckConfirm() {
    if (passwordInput.value === passwordInput2.value) {
      alert("비밀번호가 일치합니다.");
      phoneSecond.focus();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      passwordInput2.select();
    }
  }

  /* --- 비밀번호 보이기 토글 --- */
  const eyeBtn = document.querySelector(".eye");

  eyeBtn.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    eyeBtn.classList.toggle("show");
  });

  passwordInput.addEventListener("input", passwordCheckHandle);
  passwordInput2.addEventListener("change", passwordCheckConfirm);

  /* --- 전화번호 입력--- */
  const phoneFirst = document.querySelector("#tel_first");
  const phoneSecond = document.querySelector(".tel_second");
  const phoneThird = document.querySelector(".tel_third");
  const phonebtn = document.querySelector(".phone_check");
  const PhoneAuth = document.querySelector(".phone_auth_box");
  const timerDisplay = document.querySelector(".phone_auth_time");
  const phoneCheckBtn = document.querySelector(".phone_auth_check_btn");
  const authNum = document.querySelector(".auth_number");

  [phoneSecond, phoneThird].forEach((field) => {
    field.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  });

  let timer = 180;
  let interval;

  const phonePop = document.createElement("div");
  phonePop.setAttribute("class", "user_pop");

  // 타이머 함수
  const handleTime = () => {
    const mm = String(Math.floor(timer / 60)).padStart(2, "0");
    const ss = String(timer % 60).padStart(2, "0");
    timerDisplay.textContent = `${mm}:${ss}`;

    if (timer <= 0) {
      clearInterval(interval);
      phoneCheckBtn.disabled = true;
      timerDisplay.textContent = "시간만료";
      return;
    }
    timer--;
  };

  const startTimer = () => {
    handleTime();
    interval = setInterval(handleTime, 1000);
  };

  // 인증번호 생성 함수
  const handleAuthNum = () => {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  };
  authNum.textContent = handleAuthNum();
  // 전화번호 인증 버튼 클릭 시
  const phoneCheck = () => {
    if (phoneFirst.value !== "010") {
      alert("전화번호 앞자리를 다시 확인해주세요");
      phoneFirst.focus();
      return;
    } else if (
      phoneSecond.value.length !== 4 ||
      phoneThird.value.length !== 4
    ) {
      alert("전화번호를 정확하게 입력해주세요.");
      phoneSecond.focus();
      return;
    }

    PhoneAuth.style.display = "flex";
    authNum.style.display = "block";

    phonePop.textContent = "인증번호를 전송하였습니다.";
    document.body.appendChild(phonePop);

    startTimer();

    setTimeout(() => {
      phonePop.remove();
    }, 2000);
  };

  phonebtn.addEventListener("click", phoneCheck);

  // 인증번호 확인 버튼 클릭 시
  const handleNumCheck = () => {
    const phoneAuthInput = document
      .querySelector(".phone_auth_check")
      .value.trim();
    const generatedNum = authNum.textContent;

    if (phoneAuthInput === generatedNum) {
      phonePop.textContent = "인증이 완료되었습니다.";
      clearInterval(interval);
    } else {
      phonePop.textContent = "인증번호가 일치하지 않습니다.";
      phonePop.style.color = "red";
    }

    document.body.appendChild(phonePop);

    setTimeout(() => {
      phonePop.remove();
    }, 2000);
  };

  phoneCheckBtn.addEventListener("click", handleNumCheck);

  /* --- 주소 검색 --- */
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

  /* --- 이용약관 체크박스 --- */
  const totalTerms = document.getElementById("total_terms");
  const termsEls = document.querySelectorAll(".terms_el");
  const terms01 = document.getElementById("terms_01");
  const terms02 = document.getElementById("terms_02");
  const terms03 = document.getElementById("terms_03");
  const terms04 = document.getElementById("terms_04");

  const totalCheck = () => {
    termsEls.forEach((el) => (el.checked = totalTerms.checked));
  };

  const termsCheck = () => {
    totalTerms.checked = [...termsEls].every((el) => el.checked);
  };

  totalTerms.addEventListener("click", totalCheck);
  termsEls.forEach((el) => el.addEventListener("click", termsCheck));

  /* --- 회원가입 버튼 --- */
  const signUpBtn = document.querySelector(".form_btn");

  const handleSignUp = (e) => {
    e.preventDefault();

    const emailInput = document.querySelector(".email_input").value.trim();
    const selectDomainInput = domainInput.value.trim();
    const idValue = idInput.value.trim();
    const password01Input = document
      .querySelector(".password01 input")
      .value.trim();
    const password02Input = passwordInput2.value.trim();
    const phoneInput01 = phoneFirst.value.trim();
    const phoneInput02 = phoneSecond.value.trim();
    const phoneInput03 = phoneThird.value.trim();
    const adressNumberInput = adressNumber.value.trim();
    const adressInputValue = adress.value.trim();
    const adressDetailInputValue = adressDetail.value.trim();
    const terms01Checked = terms01.checked;
    const terms02Checked = terms02.checked;

    const isFormFilled =
      emailInput &&
      selectDomainInput &&
      idValue &&
      password01Input &&
      password02Input &&
      phoneInput01 &&
      phoneInput02 &&
      phoneInput03 &&
      adressNumberInput &&
      adressInputValue &&
      adressDetailInputValue &&
      terms01Checked &&
      terms02Checked;

    if (isFormFilled) {
      const newUser = {
        email: `${emailInput}@${selectDomainInput}`,
        id: idValue,
        pw: password01Input,
        phone: `${phoneInput01}-${phoneInput02}-${phoneInput03}`,
        address: {
          adressNum: adressNumberInput,
          adress: adressInputValue,
          detailAdress: adressDetailInputValue,
        },
        terms: {
          terms01: terms01Checked,
          terms02: terms02Checked,
        },
        createdAt: new Date().toISOString(),
      };

      const addUsers = JSON.parse(localStorage.getItem("newUsers")) || [];
      addUsers.push(newUser);
      localStorage.setItem("newUsers", JSON.stringify(addUsers));
      alert("회원가입이 완료되었습니다!");
      location.href = "./login.html";
    } else {
      alert("회원가입에 실패하였습니다. 다시 한 번 확인해주세요.");
    }
  };

  signUpBtn.addEventListener("click", handleSignUp);

  /* --- 공통 팝업 함수 --- */
  function showPopup(text, className, duration = 1000) {
    const pop = document.createElement("div");
    pop.className = className;
    pop.textContent = text;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), duration);
  }
});
