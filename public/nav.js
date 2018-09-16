"use strict";

function loadNav() {
  let url = window.location.href.split("/").pop();

  let user_id = localStorage.getItem("user_id");
  $(".nav-bar").html(`<ul class='cf'>
        ${
          user_id != ""
            ? `
          <li>
            <a class="login out" href="./signup.html">
              Log Out
            </a>
          </li>`
            : ` <li>
          <a class="login" href="./signup.html">
            Log In
          </a>
        </li>`
        }
        ${
          url != "index.html"
            ? `
        <li>
            <a href='./index.html'>Cards</a>
        </li>`
            : ""
        }
        ${
          url != "community.html"
            ? `
            <li>
                <a href='./community.html'>Community Lists</a>
            </li>
        `
            : ""
        }
        ${
          url != "account.html"
            ? `
            <li>
                <a href='./account.html'>My Lists</a>
            </li>`
            : ""
        }
        </ul>
        <a href="#" id="openup">Menu</a>`);

  $(".login.out").click(() => {
    localStorage.clear();
    window.location.replace("/signup.html");
  });
}
loadNav();
