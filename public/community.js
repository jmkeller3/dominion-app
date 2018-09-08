"use strict";

(async function() {
  const setdata = await $.getJSON("dominion-cards.json");

  let carddata = [];
  for (let arr of Object.values(setdata)) {
    carddata = carddata.concat(arr);
  }

  function displayCards(cards) {
    const hmtlcards = cards.map(
      card => `
            <div class="card fill" draggable="true" id="${card.name}">
                <img class="card-img" src="${card.picture}"  alt="${
        card.rules
      }">
            </div>`
    );
    console.log(`success`);
    $(".sidebar").html(hmtlcards);
  }

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
  let listcards;
  function listfilter(card, array) {
    for (let i = 0; i < array.length; i++) return card.name.includes(array[i]);
  }
  function getCards(lists) {
    return (listcards = lists.map(
      list => [
        list.card1,
        list.card2,
        list.card3,
        list.card4,
        list.card5,
        list.card6,
        list.card7,
        list.card8,
        list.card9,
        list.card10
      ],
      listfilter(card, listcards),
      displayCards(carddata.filter(listfilter))
    ));
  }

  displayLists(cardlists);
  getCards(cardlists);
})();
