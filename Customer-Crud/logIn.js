const loginButton = document.querySelector(".login-input");

// submit button Event

// submitButton.addEventListener("click", function () {
//   const eMail = "krishvelliappan@gmail.com";
//   const pwd = "Breezeware123";

//   const email = document.getElementById("e-mail").value;
//   const passWord = document.getElementById("password").value;

//   const emailRequired = document.getElementById("email-required");
//   const passwordRequired = document.getElementById("password-required");

//   if (email == "") {
//     emailRequired.innerHTML = "E-mail is required";
//   } else if (email !== eMail) {
//     emailRequired.innerHTML = "Incorrect mail id";
//   } else {
//     emailRequired.innerHTML = "";
//   }
//   if (passWord == "") {
//     passwordRequired.innerHTML = "password is required";
//   } else if (passWord !== eMail) {
//     passwordRequired.innerHTML = "Incorrect Password";
//   } else {
//     passwordRequired.innerHTML = "";
//   }

//   if (email !== "" && passWord !== "" && email == eMail && passWord == pwd) {
//     location.href = "customersData.html";
//   }
// });

// cancel button Event

// loginButton.addEventListener("click", function () {
//   const email = (document.getElementById("e-mail").value = "");
//   const passWord = (document.getElementById("password").value = "");

//   const emailRequired = document.getElementById("email-required");
//   const passwordRequired = document.getElementById("password-required");

//   emailRequired.innerHTML = "";
//   passwordRequired.innerHTML = "";
// });

localStorage.setItem("email", "krishvelliappan@gmail.com");
localStorage.setItem("password", "Breezeware123");

loginButton.addEventListener("click", function () {
  const email = document.getElementById("e-mail").value;
  const passWord = document.getElementById("password").value;

  const eMail = localStorage.getItem("email");
  const pwd = localStorage.getItem("password");

  const emailRequired = document.getElementById("email-required");
  const passwordRequired = document.getElementById("password-required");
  const errorMsg = document.querySelector(".error-msg");

  if (email === "" || passWord === "") {
    if (email == "") {
      emailRequired.innerHTML = "E-mail is required";
    } else if (email !== eMail) {
      emailRequired.innerHTML = "";
    } else {
      emailRequired.innerHTML = "";
    }
    if (passWord == "") {
      passwordRequired.innerHTML = "password is required";
    } else if (passWord !== pwd) {
      passwordRequired.innerHTML = "";
    } else {
      passwordRequired.innerHTML = "";
    }
  } else {
    if (email === eMail && passWord === pwd) {
      location.href = "customersData.html";
    } else {
      emailRequired.innerHTML = "";
      passwordRequired.innerHTML = "";
      errorMsg.innerHTML = "E-mail or password is invalid";
    }
  }

  //   --------------------------------//-------------------------//
});

const visibleIcon = document.querySelector(".visible-icon");

visibleIcon.addEventListener("click", function () {
  const passWord = document.getElementById("password");
  const changeIcon = document.querySelector(".visible-icon");

  if (passWord.type === "password") {
    changeIcon.textContent = "visibility_off";

    password.type = "text";
  } else {
    changeIcon.textContent = "visibility";

    password.type = "password";
  }
});
