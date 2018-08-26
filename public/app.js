"use strict";

//Card Display
(async function() {
  const setdata = await $.getJSON("dominion-cards.json");

  console.log(setdata);

  let carddata = [];
  for (let arr of Object.values(setdata)) {
    carddata = carddata.concat(arr);
  }

  console.log(carddata);

  function displayCards(cards) {
    // const card = cards[0];
    const hmtlcards = cards.map(
      card => `
            <div class="card">
                <img class="card-img" src="${card.picture}" id="${
        card.name
      }" alt="${card.rules}">
            </div>`
    );
    $(".content").html(hmtlcards);
  }

  //sort by rank
  let rankCards = carddata.slice().sort((a, b) => {
    let expansions = Object.keys(setdata);
    let aIndex = expansions.indexOf(a.expansion);
    let bIndex = expansions.indexOf(b.expansion);
    return a.expansion == b.expansion ? a.rank - b.rank : aIndex - bIndex;
  });

  displayCards(carddata);

  $(".attack-btn").click(() => {
    event.preventDefault();
    activeType = "Attack";
    displayCards(carddata.filter(cardFilter));
    console.log(`Button worked!`);
  });
  $(".treasure-btn").click(() => {
    event.preventDefault();
    activeType = "Treasure";
    displayCards(carddata.filter(cardFilter));
    console.log(`Button worked!`);
  });
  $(".reaction-btn").click(() => {
    event.preventDefault();
    activeType = "Reaction";
    displayCards(carddata.filter(cardFilter));
    console.log(`Button worked!`);
  });
  $(".rank-btn").click(() => {
    event.preventDefault();
    activeType = "Rank";
    displayCards(
      carddata.filter(filterSets).sort((a, b) => {
        let expansions = Object.keys(setdata);
        let aIndex = expansions.indexOf(a.expansion);
        let bIndex = expansions.indexOf(b.expansion);
        return a.expansion == b.expansion ? a.rank - b.rank : aIndex - bIndex;
      })
    );
    console.log(`Button worked!`);
  });
  $(".all-btn").click(() => {
    event.preventDefault();
    activeType = "default";
    displayCards(carddata.filter(cardFilter));
    console.log(`Button worked!`);
  });

  let activeType;
  function filterType(card) {
    switch (activeType) {
      case "Attack":
        return card.type.includes("Attack");
      case "Treasure":
        return card.type.includes("Treasure");
      case "Reaction":
        return card.type.includes("Reaction");

      default:
        return true;
    }
  }

  let selectedSet = "";
  function filterSets(card) {
    if (selectedSet == "") {
      return true;
    }
    return card.expansion == selectedSet;
  }

  function cardFilter(card) {
    return filterSets(card) && filterType(card);
  }

  $("#setOptions").change(event => {
    selectedSet = event.target.value;
    displayCards(carddata.filter(cardFilter));
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //search individual cards
  function searchCards() {
    let input, filter, cards, show, i;
    input = document.getElementById("cardSearch");
    filter = capitalizeFirstLetter(input.value);
    cards = document.getElementsByClassName("card");
    //loop through card array
    for (i = 0; i < cards.length; i++) {
      show = cards[i].getElementsByTagName("img")[0];
      if (show.id.indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }

  document.getElementById("cardSearch").addEventListener("keyup", searchCards);

  // document.addEventListener(
  //   "DOMContentLoaded",
  //   function() {
  //     document.querySelector(
  //       'select[name="setOptions"]'
  //     ).onchange = changeEventHandler;
  //   },
  //   false
  // );

  // let selectedSet;
  // function changeEventHandler(event) {
  //   // You can use “this” to refer to the selected element.
  //   if (!event.target.value) alert("Please Select A Set");
  //   else selectedSet = event.target.value;
  //   console.log(selectedSet);
  //   displayCards();
  // }

  // filter by type functions
})();
