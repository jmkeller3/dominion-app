(async function() {
  // Access user's id
  let user_id = localStorage.getItem("user_id");

  // Access User's cardlist based on their id
  let user = await $.ajax({
    url: `/api/users/${user_id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    method: "GET",
    contentType: "application/json"
  });

  let cardlists = user.cardlists;

  const setdata = await $.getJSON("dominion-cards.json");

  let carddata = [];
  for (let arr of Object.values(setdata)) {
    carddata = carddata.concat(arr);
  }

  //displays the user's lists
  function displayLists(lists) {
    const htmllist = lists.map(
      list => `
            <div id="${list.id}" class="community-list">
            <header class="list-header">
            <h1>${list.name}</h1>
            <div class="list-btns">
            <button data-id="${list.id}" class="edit-list">Edit List</button>
            <button data-id="${
              list.id
            }" class="delete-list">Delete List</button>
            </div>
            </header>
            
            <div class="community-cards">
              <!-- card 1 -->
              <div class="card" id="${list.card1.name}">
              <img class="card-img" src="${list.card1.picture}" alt="${
        list.card1.rules
      }">
    </div>
              <!-- card 2 -->
              <div class="card" id="${list.card2.name}">
              <img class="card-img" src="${list.card2.picture}" alt="${
        list.card2.rules
      }">
    </div>
              <!-- card 3 -->
              <div class="card" id="${list.card3.name}">
              <img class="card-img" src="${list.card3.picture}" alt="${
        list.card3.rules
      }">
    </div>
              <!-- card 4 -->
              <div class="card" id="${list.card4.name}">
              <img class="card-img" src="${list.card4.picture}" alt="${
        list.card4.rules
      }">
    </div>
              <!-- card 5 -->
              <div class="card" id="${list.card5.name}">
              <img class="card-img" src="${list.card5.picture}" alt="${
        list.card5.rules
      }">
    </div>
              <!-- card 6 -->
              <div class="card" id="${list.card6.name}">
              <img class="card-img" src="${list.card6.picture}" alt="${
        list.card6.rules
      }">
    </div>
              <!-- card 7 -->
              <div class="card" id="${list.card7.name}">
              <img class="card-img" src="${list.card7.picture}" alt="${
        list.card7.rules
      }">
    </div>
              <!-- card 8 -->
              <div class="card" id="${list.card8.name}">
              <img class="card-img" src="${list.card8.picture}" alt="${
        list.card8.rules
      }">
    </div>
              <!-- card 9 -->
              <div class="card" id="${list.card9.name}">
              <img class="card-img" src="${list.card9.picture}" alt="${
        list.card9.rules
      }">
    </div>
              <!-- card 10 -->
              <div class="card" id="${list.card10.name}">
              <img class="card-img" src="${list.card10.picture}" alt="${
        list.card10.rules
      }">
    </div>
    </div>
      <table aria-label="Table of cards from ${list.name}" class="text-list">
        <thead>
        <tr>
          <th>Name</th>
          <th>Expansion</th>
          <th>Cost</th>
          <th>Type</th>
          <th>Rank</th> 
          <th>Rules</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>${list.card1.name}</td>
          <td>${list.card1.expansion}</td>
          <td>${list.card1.cost}</td>
          <td>${list.card1.type}</td>
          <td>${list.card1.rank}</td> 
          <td>${list.card1.rules}</td>
        </tr>
        <tr>
          <td>${list.card2.name}</td>
          <td>${list.card2.expansion}</td>
          <td>${list.card2.cost}</td>
          <td>${list.card2.type}</td>
          <td>${list.card2.rank}</td> 
          <td>${list.card2.rules}</td>
        </tr>
        <tr>
          <td>${list.card3.name}</td>
          <td>${list.card3.expansion}</td>
          <td>${list.card3.cost}</td>
          <td>${list.card3.type}</td>
          <td>${list.card3.rank}</td> 
          <td>${list.card3.rules}</td>
        </tr>
        <tr>
          <td>${list.card4.name}</td>
          <td>${list.card4.expansion}</td>
          <td>${list.card4.cost}</td>
          <td>${list.card4.type}</td>
          <td>${list.card4.rank}</td> 
          <td>${list.card4.rules}</td>
        </tr>
        <tr>
          <td>${list.card5.name}</td>
          <td>${list.card5.expansion}</td>
          <td>${list.card5.cost}</td>
          <td>${list.card5.type}</td>
          <td>${list.card5.rank}</td> 
          <td>${list.card5.rules}</td>
        </tr>      
        <tr>
          <td>${list.card6.name}</td>
          <td>${list.card6.expansion}</td>
          <td>${list.card6.cost}</td>
          <td>${list.card6.type}</td>
          <td>${list.card6.rank}</td> 
          <td>${list.card6.rules}</td>
        </tr>
        <tr>
          <td>${list.card7.name}</td>
          <td>${list.card7.expansion}</td>
          <td>${list.card7.cost}</td>
          <td>${list.card7.type}</td>
          <td>${list.card7.rank}</td> 
          <td>${list.card7.rules}</td>
        </tr>
        <tr>
          <td>${list.card8.name}</td>
          <td>${list.card8.expansion}</td>
          <td>${list.card8.cost}</td>
          <td>${list.card8.type}</td>
          <td>${list.card8.rank}</td> 
          <td>${list.card8.rules}</td>
        </tr>
        <tr>
          <td>${list.card9.name}</td>
          <td>${list.card9.expansion}</td>
          <td>${list.card9.cost}</td>
          <td>${list.card9.type}</td>
          <td>${list.card9.rank}</td> 
          <td>${list.card9.rules}</td>
        </tr>
        <tr>
          <td>${list.card10.name}</td>
          <td>${list.card10.expansion}</td>
          <td>${list.card10.cost}</td>
          <td>${list.card10.type}</td>
          <td>${list.card10.rank}</td> 
          <td>${list.card10.rules}</td>
        </tr>
        </tbody>
      </table>              
    </div>`
    );
    $("#my-lists").html(htmllist);

    //Edit List Button
    $(".edit-list").click(e => {
      e.preventDefault();
      let list = e.currentTarget;
      let list_id = $(list).data("id");
      localStorage.setItem("cardlist-id", list_id);
      window.location.replace("/cards.html");
    });

    //Delete List Button
    $(".delete-list").click(e => {
      e.preventDefault();
      let list = e.currentTarget;
      let list_id = $(list).data("id");
      $.ajax({
        url: `/api/cardlist/${list_id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        method: "DELETE",
        contentType: "application/json"
      });
      $(list)
        .parent()
        .css("display", "none");
    });
  }

  // Creates list filter
  function listFilterCreator(listcards) {
    return function listfilter(card) {
      return listcards.some(cardName => cardName === card.name);
    };
  }

  // Populates Card list with card data through function binding
  function propEq(prop, val) {
    return function(obj) {
      return obj[prop] === val;
    };
  }

  let newCardLists = cardlists.map(list => ({
    name: list.name,
    id: list._id,
    card1: carddata.find(propEq("name", list.card1)),
    card2: carddata.find(propEq("name", list.card2)),
    card3: carddata.find(propEq("name", list.card3)),
    card4: carddata.find(propEq("name", list.card4)),
    card5: carddata.find(propEq("name", list.card5)),
    card6: carddata.find(propEq("name", list.card6)),
    card7: carddata.find(propEq("name", list.card7)),
    card8: carddata.find(propEq("name", list.card8)),
    card9: carddata.find(propEq("name", list.card9)),
    card10: carddata.find(propEq("name", list.card10))
  }));

  displayLists(newCardLists);
})();
