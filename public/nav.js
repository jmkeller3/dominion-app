"use strict";

// Dynamic Nav for pages
function loadNav() {
  let url = window.location.href.split("/").pop();

  let user_id = localStorage.getItem("user_id");
  $(".nav-bar").html(`<ul class='cf'>
        ${
          user_id != null
            ? `
          <li>
            <a class="login out" href="./index.html">
              Log Out
            </a>
          </li>`
            : ` <li>
          <a class="login" href="./index.html">
            Log In
          </a>
        </li>`
        }
        ${
          url != "cards.html"
            ? `
        <li>
            <a href='./cards.html'>Cards</a>
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
          url != "index.html"
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
