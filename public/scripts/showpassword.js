// rāda paroli profilā
const form = document.getElementById("form");
form.showpass.addEventListener("click", function (e) {
  let x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
});
