"use strict";

$("#Signup").click(e => {
  e.preventDefault();
  let email = $('[name="email"]').val();
  let password = $('[name="pass"]').val();
  let cpassword = $('[name="cpass"]').val();
  if (password !== cpassword) {
    alert(`Please match sure your passwords match!`);
    return;
  }
  if (password === "" || cpassword === "") {
    alert(`Please enter a password and confirm it`);
    return;
  }
  if (email === "") {
    alert(`Please enter valid email`);
    return;
  }
  $.ajax("/users", {
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email,
      password
    })
  }).then(response => {
    console.log(`${response}`);
  });
});
