"use strict";

(async function() {
  const jwtAuth = localStorage.getItem("token");

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
    clickListener();
    dragCards();
    divFocus("card-img");
  }

  //Make divs focusable
  function divFocus(className) {
    let divs = document.getElementsByClassName(`${className}`);
    for (let i = 0; i < divs.length; i++) {
      divs[i].setAttribute("tabindex", "0");
    }
  }

  //a11y Acessessible
  function a11yClick(e) {
    if (e.type === "click") {
      return true;
    } else if (e.type === "keypress") {
      let code = e.charCode || e.keyCode;
      if (code === 32 || code === 13) {
        return true;
      }
    } else {
      return false;
    }
  }

  //Buttons
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

  //update list
  if (localStorage.getItem("cardlist-id") !== null) {
    let cardlist_id = localStorage.getItem("cardlist-id");
    console.log(cardlist_id);
    $.ajax({
      url: `api/cardlist/${cardlist_id}`,
      method: "GET",
      headers: { Authorization: `Bearer ${jwtAuth}` },
      contentType: "json",
      success: function(data) {
        let updatename = data.name;
        let updatecards = [];
        let updatecard1 = data.card1;
        updatecards.push(updatecard1);
        let updatecard2 = data.card2;
        updatecards.push(updatecard2);
        let updatecard3 = data.card3;
        updatecards.push(updatecard3);
        let updatecard4 = data.card4;
        updatecards.push(updatecard4);
        let updatecard5 = data.card5;
        updatecards.push(updatecard5);
        let updatecard6 = data.card6;
        updatecards.push(updatecard6);
        let updatecard7 = data.card7;
        updatecards.push(updatecard7);
        let updatecard8 = data.card8;
        updatecards.push(updatecard8);
        let updatecard9 = data.card9;
        updatecards.push(updatecard9);
        let updatecard10 = data.card10;
        updatecards.push(updatecard10);

        const cardlist = $(".list-ul").find("li");

        for (let i = 0; i < cardlist.length; i++) {
          const cardListElement = $(cardlist).eq(i);
          for (let a = 0; a < updatecards.length; a++)
            if (!cardListElement.hasClass("filled")) {
              cardListElement.html(updatecards[a]);
              cardListElement.addClass("filled");
              console.log(updatecards[a]);
              break;
            }
        }
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

          let name = prompt(
            `Please enter a name for your list`,
            `${updatename}`
          );

          if (jwtAuth == null) {
            alert(`Please login before you save a list`);
            return;
          }

          let user = localStorage.getItem("user_id");
          console.log(cardlist_id);

          $.ajax({
            url: `api/cardlist/${cardlist_id}`,
            method: "PUT",
            headers: { Authorization: `Bearer ${jwtAuth}` },
            contentType: "application/json",
            data: JSON.stringify({
              id: cardlist_id,
              creator: user,
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
          localStorage.removeItem("cardlist-id");
          window.location.replace("/account.html");
        });
      }
    });
  }

  // submit list button
  $("#list-submit").click(e => {
    e.preventDefault();

    if (localStorage.getItem("cardlist-id") != null) {
      return;
    }

    let savelist = $(".filled")
      .toArray()
      .map(li => li.innerHTML);
    console.log(savelist);

    if (savelist.length < 9) {
      alert(`Please fill list with ten cards`);
      return;
    }

    let name = prompt("Please enter a name for your list", "My List");

    if (jwtAuth == null) {
      console.log("jwtAuth working");
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
    window.location.reload();
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
  function clickListener() {
    const cardlist = $(".list-ul").find("li");
    var clickedCard = $(".card");
    var clickedCardName;

    clickedCard.on("click keypress", function(event) {
      event.preventDefault();
      if (a11yClick(event) === true) {
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
      }
    });
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

  //Display Cards
  displayCards(carddata);
})();
