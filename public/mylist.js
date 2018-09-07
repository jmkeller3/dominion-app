(async function() {
  let cardlists = await $.ajax({
    url: "/api/users",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    method: "GET",
    contentType: "application/json",
    data: JSON.stringify({
      cardlists
    })
  });

  const setdata = await $.getJSON("dominion-cards.json");

  let carddata = [];
  for (let arr of Object.values(setdata)) {
    carddata = carddata.concat(arr);
  }

  let lists = [];
  for (let arr of Object.values(cardlists)) {
    lists = lists.concat(arr);
  }

  let listdata = carddata.filter(lists);

  function displayCards(cards) {
    const hmtlcards = cards.map(
      card => `
            <div class="card fill" draggable="true" id="${card.name}">
                <img class="card-img" src="${card.picture}"  alt="${
        card.rules
      }">
            </div>`
    );
    $("#my-lists").html(hmtlcards);
  }

  displayCards(listdata);
});
