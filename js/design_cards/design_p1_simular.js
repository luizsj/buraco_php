function design_p1_simular_card_groups(nCards) {
    //simular um baralho completo
    //e sorteia nCards desse baralho
    //e devolve grupos de cartas
    //ordenados pelo valor de face
    //e contendo uma lista de naipes

    const values = ['A', 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 2];
    const objBaralho = design_p1_simular_baralho(values);
            //vem com 1C-preto e 1C-vermelho
            //C não está no values inicial
    values.push('C');
    const myCards = [];
    let cardGroup = new Object();
    const listGroups = [];
    let listNaipes = [];
    let value = '';
    let randPosition = 0;

    //sortear nCards - podem ser repetidas
    while (myCards.length < nCards) {
        randPosition = Math.floor(Math.random()*54);
        myCards.push(objBaralho[randPosition]);
    }
    //percorrer o array inicial de values
    //para cada valor, se tiver na lista de cartas gerada
    //separa em grupos, indicado o valor e quais naipes têm
    
    for (let i=0; i < values.length; i++) {
        value = values[i];
        cardGroup = new Object();
        listNaipes = [];
        for (j=0; j < myCards.length; j++) {
            if (myCards[j].value == value){
                listNaipes.push(myCards[j].naipe);
            }
        }
        if (listNaipes.length > 0) {
            cardGroup.value = value;
            cardGroup.listNaipes = listNaipes;
            listGroups.push(cardGroup);
        }
    }
    console.log(listGroups);
    return listGroups;
}

function design_p1_simular_baralho(values) {
    //simula um baralho completo
    const naipes = ['copas', 'espadas', 'ouros', 'paus'];
    const baralho = [];
    for (let i = 0; i < naipes.length; i++) {
        for (let j=0; j < values.length; j++) {
            let card = new Object();
            card.value = values[j];
            card.naipe = naipes[i];
            baralho.push(card);
        }
        let card = new Object();
        card.value = 'C';
        if (i == 0) {
            card.naipe = 'Vermelho';
            baralho.push(card);
        } else if (i == 2) {
            card.naipe = 'Preto';
            baralho.push(card);            
        }
    }
    return baralho;
}