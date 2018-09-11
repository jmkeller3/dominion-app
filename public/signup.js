"use strict";

$("#Login").click(e => {
  e.preventDefault();
  let email = $('[name="logemail"]').val();
  let password = $('[name="logpass"]').val();
  if (email === "") {
    alert(`Please enter valid email`);
    return;
  }
  if (password === "") {
    alert(`Please enter a valid password`);
    return;
  }
  (async () => {
    let token = await $.ajax({
      url: "/api/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      })
    });
    console.log(token.authToken);
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("user_id", token.user);
  })();
});

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
  (async () => {
    await $.ajax({
      url: "/api/users",
      // headers: {
      //   Authorization: localStorage.getItem("token")
      // },
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      }),
      error: function(err) {
        console.log(`Error!`, err);
      }
    });
    console.log(`User created!`);
    let token = await $.ajax({
      url: "/api/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      })
    });
    console.log(`Success!`);
    console.log(token.authToken);
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("user_id", token.user);
  })();
});

//Ajax authentication before bearer token
// beforeSend: function(xhr) {
//   xhr.setRequestHeader("Authorization", "Bearer" + token);
// }
