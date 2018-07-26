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
        return card.type.includes("Attack")
    });

    let treasureCards = carddata.filter(function(card) {
        return card.type.includes("Treasure")
    });

    let reactionCards = carddata.filter(function(card) {
        return card.type.includes("Reaction")
    });

    let rankCards = carddata.slice().sort((a, b) => {
        let expansions = Object.keys(setdata);
        let aIndex = expansions.indexOf(a.expansion);
        let bIndex = expansions.indexOf(b.expansion);
        return a.expansion == b.expansion ?       a.rank-b.rank : aIndex - bIndex
    });

    console.log(attackCards);

    console.log(treasureCards);

    console.log(reactionCards);

    console.log(rankCards);

    displayCards(rankCards);
    

    
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






