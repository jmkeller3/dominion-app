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
            <div class="card">
                <img class="card-img" src="${card.picture}" alt="${card.rules}">
            </div>`);
        $('.content').html(hmtlcards);
    }

    let attackCards = carddata.filter(function(card) {
        return card.type == "Action - Attack"
    });

    let treasureCards = carddata.filter(function(card) {
        return card.type == "Treasure"
    });

    let reactionCards = carddata.filter(function(card) {
        return card.type == "Action - Reaction"
    });

    console.log(attackCards);

    console.log(treasureCards);

    console.log(reactionCards);

    displayCards(reactionCards);
    

    
    // filter functions

    function filterAttack(type) {
        
        type == "Action - Attack"
    }

    function filterTreasure(type) {
        return type == "Treasure"
    }

    function filterReaction(type) {
        return type == "Reaction"
    }

    //sort by rank
    function sortRank(cardrankingss) {
        cardrankingss.sort(function(a, b){return a - b});
    }

})()






