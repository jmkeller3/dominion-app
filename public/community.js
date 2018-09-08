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
            <div class="card" id="${card.name}">
                <img class="card-img" src="${card.picture}"  alt="${
        card.rules
      }">
            </div>`
    );
    console.log(`success`);
    $("#community-lists").html(hmtlcards);
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
              <div class="community-list-cards">
              <h1>Name: ${list.name}</h1>
                <!-- card 1 -->
                <div class="card" id="${list.card1.name}">
                <img class="card-img" src="${list.card1.picture}" alt="${
        list.card1.rules
      }">
                <!-- card 2 -->
                <div class="card" id="${list.card2.name}">
                <img class="card-img" src="${list.card2.picture}" alt="${
        list.card2.rules
      }">
                <!-- card 3 -->
                <div class="card" id="${list.card3.name}">
                <img class="card-img" src="${list.card3.picture}" alt="${
        list.card3.rules
      }">
                <!-- card 4 -->
                <div class="card" id="${list.card4.name}">
                <img class="card-img" src="${list.card4.picture}" alt="${
        list.card4.rules
      }">
                <!-- card 5 -->
                <div class="card" id="${list.card5.name}">
                <img class="card-img" src="${list.card5.picture}" alt="${
        list.card5.rules
      }">
                <!-- card 6 -->
                <div class="card" id="${list.card6.name}">
                <img class="card-img" src="${list.card6.picture}" alt="${
        list.card6.rules
      }">
                <!-- card 7 -->
                <div class="card" id="${list.card7.name}">
                <img class="card-img" src="${list.card7.picture}" alt="${
        list.card7.rules
      }">
                <!-- card 8 -->
                <div class="card" id="${list.card8.name}">
                <img class="card-img" src="${list.card8.picture}" alt="${
        list.card8.rules
      }">
                <!-- card 9 -->
                <div class="card" id="${list.card9.name}">
                <img class="card-img" src="${list.card9.picture}" alt="${
        list.card9.rules
      }">
                <!-- card 10 -->
                <div class="card" id="${list.card10.name}">
                <img class="card-img" src="${list.card10.picture}" alt="${
        list.card10.rules
      }">
                <ul class="community-ul">
                    <li>Card 1: ${list.card1.name}</li>
                    <li>Card 2: ${list.card2.name}</li>
                    <li>Card 3: ${list.card3.name}</li>
                    <li>Card 4: ${list.card4.name}</li>
                    <li>Card 5: ${list.card5.name}</li>
                    <li>Card 6: ${list.card6.name}</li>
                    <li>Card 7: ${list.card7.name}</li>
                    <li>Card 8: ${list.card8.name}</li>
                    <li>Card 9: ${list.card9.name}</li>
                    <li>Card 10: ${list.card10.name}</li>
                  </ul>
              </div>`
    );
    $(".text-lists").html(htmllist);
  }

  function listFilterCreator(listcards) {
    return function listfilter(card) {
      return listcards.some(cardName => cardName === card.name);

      //return cards[a].name.includes([array[i]]);
    };
  }

  function getCards(lists) {
    const listcards = lists.map(
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
      ]

      // displayCards(carddata.filter(listfilter))
    );
    console.log(listcards);
    displayCards(carddata.filter(listFilterCreator(listcards[0])));
  }

  function propEq(prop, val) {
    return function(obj) {
      return obj[prop] === val;
    };
  }

  let newCardLists = cardlists.map(list => ({
    name: list.name,
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
  //getCards(cardlists);
})();
