function game_redesign_cards(){
    //desenha nCards digitaddo na tela para o player 1
    let nCards = document.getElementById('txtNcards').value;
    const cardGroups = design_p1_simular_card_groups(nCards);
    design_p1_redesign(cardGroups);

    //desenha para os outros players
    design_vert_redesign(nCards, 'player2');
    design_p3_redesign(nCards);
    design_vert_redesign(nCards, 'player4');
}