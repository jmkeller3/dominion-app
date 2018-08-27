"use strict";

(async function() {
  //Card Display
  const setdata = await $.getJSON("dominion-cards.json");

  console.log(setdata);

  let carddata = [];
  for (let arr of Object.values(setdata)) {
    carddata = carddata.concat(arr);
  }

  console.log(carddata);

  function displayCards(cards) {
    const hmtlcards = cards.map(
      card => `
            <div class="card fill" draggable="true" id="${card.name}">
                <img class="card-img" src="${card.picture}"  alt="${
        card.rules
      }">
            </div>`
    );
    $(".content").html(hmtlcards);
  }

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

  //filters
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
      show = cards[i];
      if (show.id.indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  document.getElementById("cardSearch").addEventListener("keyup", searchCards);

  //Drag Functions
  var fills = document.querySelectorAll(".fill"),
    result;
  for (let i = 0; i < fills.length; i++) {
    result = fills[i];
    result.addEventListener("dragstart", dragStart);
    result.addEventListener("dragend", dragEnd);
  }
  const empties = document.querySelectorAll(".empty");

  //fill listeners
  // fills.addEventListener("dragstart", dragStart);
  // fills.addEventListener("dragend", dragEnd);

  //Loop through empties and call drag events
  for (const empty of empties) {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
  // Drag functions
  let cardname;
  function dragStart() {
    cardname = this.id;
    setTimeout(() => (this.className = "invisible"), 0);
    this.className += " hold";
    console.log(cardname);
  }

  function dragEnd() {
    this.className = "fill";
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.className += " hovered";
  }

  function dragLeave() {
    this.className = "empty";
  }

  function dragDrop() {
    this.className = "empty";
    this.innerHTML = cardname;
  }

  //Save list to server
  // $.ajax({
  //   url: "api/cardlist",
  //   method: "GET",
  //   data: JSON.stringify({
  //     name,
  //     card1,
  //     card2,
  //     card3,
  //     card4,
  //     card5,
  //     card6,
  //     card7,
  //     card8,
  //     card9,
  //     card10
  //   })
  // });
})();
