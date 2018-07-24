'use strict';

(async function() {
    const setdata = await $.getJSON("dominion-cards.json");
    
    console.log(setdata);

    let carddata = [];
    for (let arr of Object.values(setdata)) {
        carddata = carddata.concat(arr);
    };

    console.log(carddata);

    function displayCards(cards) {
        // const card = cards[0];
        const hmtlcards = cards.map(card =>`
                        <div class="col-3">
                            <div class="card">
                                <img src="${card.picture}" alt="${card.rules}">
                            </div>
                        </div>`);
        $('.window').html(hmtlcards);
    }

    displayCards(carddata);
    
    
    // filter functions

    function actionAttack(type) {
        return type === "Action - Attack"
    }

    function treasure(type) {
        return type === "Treasure"
    }

    function reaction(type) {
        return type === "Reaction"
    }

    //sort by rank
    function rank(cardrankingss) {
        cardrankingss.sort(function(a, b){return a - b});
    }

})()






