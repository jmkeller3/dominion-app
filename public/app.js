"use strict";

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
                <img class="card-img" src="${card.picture}" alt="${card.rules}">
            </div>`
    );
    $(".content").html(hmtlcards);
  }

  //filter by attacks
  let attackCards = carddata.filter(filterAttack);

  let treasureCards = carddata.filter(filterTreasure);

  let reactionCards = carddata.filter(filterReaction);

  //sort by rank
  let rankCards = carddata.slice().sort((a, b) => {
    let expansions = Object.keys(setdata);
    let aIndex = expansions.indexOf(a.expansion);
    let bIndex = expansions.indexOf(b.expansion);
    return a.expansion == b.expansion ? a.rank - b.rank : aIndex - bIndex;
  });

  console.log(attackCards);

  console.log(treasureCards);

  console.log(reactionCards);

  console.log(rankCards);

  displayCards(carddata);

  $(".attack-btn").click(() => {
    event.preventDefault();
    displayCards(attackCards);
    console.log(`Button worked!`);
  });
  $(".treasure-btn").click(() => {
    event.preventDefault();
    displayCards(treasureCards);
    console.log(`Button worked!`);
  });
  $(".reaction-btn").click(() => {
    event.preventDefault();
    displayCards(reactionCards);
    console.log(`Button worked!`);
  });
  $(".rank-btn").click(() => {
    event.preventDefault();
    displayCards(rankCards);
    console.log(`Button worked!`);
  });
  $(".all-btn").click(() => {
    event.preventDefault();
    displayCards(carddata);
    console.log(`Button worked!`);
  });

  document.addEventListener(
    "DOMContentLoaded",
    function() {
      document.querySelector(
        'select[name="setOptions"]'
      ).onchange = changeEventHandler;
    },
    false
  );

  let selectedSet;
  function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.
    if (!event.target.value) alert("Please Select A Set");
    else selectedSet = event.target.value;
    console.log(selectedSet);
    displayCards();
  }

  // filter functions

  function filterAttack(card) {
    return card.type.includes("Attack");
  }

  function filterTreasure(card) {
    return card.type.includes("Treasure");
  }

  function filterReaction(card) {
    return card.type.includes("Reaction");
  }

  function filterSets(card) {
    const set = document.getElementById("setOptions");
    let selectedSet = set.options[set.selectedIndex].text;

    console.log(selectedSet);

    return card.expansion.includes(selectedSet);
  }
})();
