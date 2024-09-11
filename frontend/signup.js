const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  if (password1 === password2) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const hashPassword = sha256(formData.get("password"));
  formData.set("password", hashPassword);

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "post",
      body: formData,
    });

    const data = await res.json();
    if (data === "200") {
      alert("회원 가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지않습니다.";
    form.appendChild(div);
  }
};

form.addEventListener("submit", handleSubmit);
