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

  //Create New User Request
  let tempToken = "";

  $.ajax({
    url: "/api/users",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email,
      password
    }),
    error: function(err) {
      console.log(`Error!`, err);
    },
    success: function(data) {
      console.log(`User created!`);
    },
    complete: function() {
      {
        $.ajax({
          url: "/api/auth/login",
          method: "POST",
          data: {
            email,
            password
          },
          success: function(response) {
            console.log(`Success!`);
            console.log(response);
            localStorage.setItem("token", data.id_token);
            tempToken = response.authToken;
            console.log(`${tempToken}`);
            console.log(`Bearer ${token}`);
          }
        });
      }
    }
  });
});
//Ajax authentication before bearer token
// beforeSend: function(xhr) {
//   xhr.setRequestHeader("Authorization", "Bearer" + token);
// }
