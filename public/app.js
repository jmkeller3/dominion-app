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
    dbclickListener();
    dragCards();
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

  // submit list button

  $("#list-submit").click(e => {
    e.preventDefault();
    let savelist = $(".filled")
      .toArray()
      .map(li => li.innerHTML);
    console.log(savelist);

    if (savelist.length < 9) {
      alert(`Please fill list with ten cards`);
      return;
    }

    let name = prompt("Please enter a name for your list", "My List");

    let jwtAuth = localStorage.getItem("token");

    if (jwtAuth == "") {
      alert(`Please login before you save a list`);
      return;
    }

    $.ajax({
      url: "api/cardlist",
      method: "POST",
      headers: { Authorization: `Bearer ${jwtAuth}` },
      contentType: "application/json",
      data: JSON.stringify({
        name,
        card1: savelist[0],
        card2: savelist[1],
        card3: savelist[2],
        card4: savelist[3],
        card5: savelist[4],
        card6: savelist[5],
        card7: savelist[6],
        card8: savelist[7],
        card9: savelist[8],
        card10: savelist[9]
      })
    });
  });

  //filters

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
      show = cards[i];
      if (show.id.indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  document.getElementById("cardSearch").addEventListener("keyup", searchCards);

  //cardlist sidebar
  function dbclickListener() {
    const cardlist = $(".list-ul").find("li");
    var clickedCard = $(".card");
    var clickedCardName;

    clickedCard.dblclick(event => {
      event.preventDefault();
      clickedCardName = $(event.target.parentElement).attr("id");
      console.log(cardlist);
      for (let i = 0; i < cardlist.length; i++) {
        const cardListElement = $(cardlist).eq(i);
        if (!cardListElement.hasClass("filled")) {
          cardListElement.html(clickedCardName);
          cardListElement.addClass("filled");
          console.log(clickedCardName);
          break;
        }
      }
    });
    // clickedCard.on(
    //   {
    //     dbclick: function(event) {
    //       event.preventDefault();
    //       clickedCardName = $(event.target.parentElement).attr("id");
    //       console.log(cardlist);
    //       for (let i = 0; i < cardlist.length; i++) {
    //         const cardListElement = $(cardlist).eq(i);
    //         if (!cardListElement.hasClass("filled")) {
    //           cardListElement.html(clickedCardName);
    //           cardListElement.addClass("filled");
    //           console.log(clickedCardName);
    //           break;
    //         }
    //       }
    //     }
    //   },
    //   {
    //     tap: function(event) {
    //       event.preventDefault();
    //       clickedCardName = $(event.target.parentElement).attr("id");
    //       console.log(cardlist);
    //       for (let i = 0; i < cardlist.length; i++) {
    //         const cardListElement = $(cardlist).eq(i);
    //         if (!cardListElement.hasClass("filled")) {
    //           cardListElement.html(clickedCardName);
    //           cardListElement.addClass("filled");
    //           console.log(clickedCardName);
    //           break;
    //         }
    //       }
    //     }
    //   }
    // );
  }

  //Drag Functions
  function dragCards() {
    const fills = document.querySelectorAll(".fill");
    let result;
    for (let i = 0; i < fills.length; i++) {
      result = fills[i];
      result.addEventListener("dragstart", dragStart);
      result.addEventListener("dragend", dragEnd);
    }
  }
  // Drag functions

  //Loop through empties and call drag events
  const empties = document.querySelectorAll(".empty");
  for (const empty of empties) {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }
  let cardname;
  let selectedCard;
  function dragStart() {
    cardname = this.id;
    selectedCard = this;

    this.className += " hold";
    console.log(cardname);
  }

  function dragEnd() {
    this.className = this.className.replace("hold", "");
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    $(this).toggleClass("hovered");
  }

  function dragLeave() {
    this.className = "empty";
  }

  function dragDrop() {
    console.log(cardname);
    $(this)
      .children("li")
      .html(cardname);
    $(this).toggleClass("hovered");
    $(this)
      .children("li")
      .addClass("filled");
  }

  //Navbar

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
