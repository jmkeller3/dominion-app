"use strict";

(async function() {
  let cardlists = await $.ajax({
    url: "/api/cardlist",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    method: "GET",
    contentType: "application/json"
  });
  console.log(cardlists);
  function displayLists(lists) {
    const htmllist = lists.map(
      list => `
              <div class="list" id="${list.name}">
                  <ul class="community-ul">
                    <li>Name: ${list.name}</li>
                    
                    <li>Card 1: ${list.card1}</li>
                    <li>Card 2: ${list.card2}</li>
                    <li>Card 3: ${list.card3}</li>
                    <li>Card 4: ${list.card4}</li>
                    <li>Card 5: ${list.card5}</li>
                    <li>Card 6: ${list.card6}</li>
                    <li>Card 7: ${list.card7}</li>
                    <li>Card 8: ${list.card8}</li>
                    <li>Card 9: ${list.card9}</li>
                    <li>Card 10: ${list.card10}</li>
                  </ul>
              </div>`
    );
    $("#community-lists").html(htmllist);
  }
  displayLists(cardlists);
})();
