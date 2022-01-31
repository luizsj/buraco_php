function game_redesign_cards(){
    console.clear;

    let nCards = document.getElementById('txtNcards').value;
    //game_redesign_cards_player1(nCards);
    
    //game_redesign_cards_player(nCards, 'player2');
    //game_redesign_cards_player(nCards, 'player3');
    game_redesign_cards_player_vertical(nCards, 'player4');
    
}

function game_redesign_cards_player1(nCards) {
    const cardGroups = game_redesign_card_groups(nCards);
    let place_div = document.getElementById('area_player1_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, (2.7/4.0));
    console.log(measureContainer);
    let baseHeight = measureContainer.height*0.95;
    let containerW = measureContainer.width*0.95;
    let containerH = measureContainer.height*0.95;
    place_div.classList = '';
    place_div.style.textAlign = 'center';
    place_div.style.verticalAlign = 'middle';
    place_div.innerHTML = game_redesign_card_groups_html(cardGroups, baseHeight, containerW, containerH, 1);
}

function game_redesign_cards_player_vertical(nCards, player) {
    let place_div = document.getElementById('area_'+player+'_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, (2.7/4.0));
    console.log(measureContainer); 
    let baseHeight = Math.floor(measureContainer.width*0.95/4*2.7);
    let containerH = measureContainer.height*0.95;
    let heightTotal = (Math.floor((1 + (nCards-1)/3))+1) * baseHeight; 
    let textHtml = ''    ;
    place_div.classList = '';
    place_div.style.textAlign = 'center';
    place_div.style.verticalAlign = 'middle';
    
    while (heightTotal > containerH) {
        baseHeight = Math.floor(baseHeight*0.95);
        heightTotal = (Math.floor((1 + (nCards-1)/3))+1) * baseHeight; 
        console.log('containerH: '+containerH+' baseHeight:'+baseHeight+', heightTotal:'+heightTotal);
    }
    for (let i=0; i < nCards; i++) {
        textHtml += '<img src="http://localhost/buraco_php/imgs/cards/versos/verso-folhas-lateral.gif"';
        textHtml += ' style="height:'+baseHeight+'px;display:inline-block;';
        if (i > 0) {
            textHtml += 'margin-top:-'+Math.floor(baseHeight/3*2)+'px;';
        }
        textHtml += '"> ';

    }
    console.log(textHtml);
    place_div.innerHTML = textHtml;
}

function game_redesign_cards_player(nCards, place) {
    console.log('REDESENHAR '+place +', '+ nCards+' cards');
    let measureBase = new Object();
    measureBase.width = 2.7;
    measureBase.height = 4.0;
    measureBase.proportion = 2.7/4.0;
    const place_div = document.getElementById('area_'+place +'_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, measureBase.proportion);
        nCardsDesign = (2 + (nCards-1)/3);
        //if (nCardsDesign < Math.floor(nCardsDesign)) {
        //    nCardsDesign = Math.floor(nCardsDesign) + 1;
        //}
        console.log('ncards '+nCards+', ncardsDesign '+nCardsDesign);

    const measureCard = game_redesign_cards_calculate_card(nCardsDesign, measureContainer, measureBase);
    if (measureCard.qtLines == 0) {
        measureCard.qtLines = 1;
    }
    measureCard.cardsPerLine = nCards/measureCard.qtLines;
    game_redesign_cards_create_imgs(place, nCards);
    game_redesign_cards_design(place, nCards, measureCard, measureContainer);
    console.log(measureCard);
    measureContainer = game_redesign_get_place_measures(place_div, measureBase.proportion);
    place_div.classList = 'cards_vertical';
    console.log(place_div);
}

function game_redesign_cards_design(place, nCards, measureCard, measureContainer) {
   
    let actualLine = 1;
    let posInLine = 0;
    let posX = 0;
    let posXbase = 0;
    let posY = 0;
    let posYbase = 0;
    let imageCard = '';
    document.getElementById('area_'+place+'_cards').classList= '';
    document.getElementById('area_'+place+'_cards').style.fontSize = 0;

    posYbase = (measureContainer.height - measureCard.height*measureCard.qtLines)/2;
        const nCardsShow = 1 + (measureCard.cardsPerLine-1)/3;
        posXbase = (measureContainer.width - nCardsShow*measureCard.width)/2;
    
    console.log('Xbase: '+posXbase);
    console.log('Ybase: '+posYbase);
    for (let c=0; c < nCards; c++) {

        if (posInLine >= measureCard.cardsPerLine) {
            actualLine += 1;
            posInLine = 0;
        }
        //para cada Carta, precisa calcular a posição XY
        //se for o player 1
        //      posição X = posicao_na_linha*width
        //              somar o espaço que sobra nas laterais
        //              espaco = (Wcontainer - cardsPerLine*cardWidth)/2        
        posX = posXbase + posInLine*measureCard.width;
        //      posição Y = para linha 1, metade do espaço que sobra
        //                  para linha 2, metade do espaço que sobra + 1cardHeight
        //                  para linha 3, metade do espaço que sobra + 2cardHeight
        posY = posYbase + ((actualLine - 1)*measureCard.height);
        imageCard = document.getElementById(place+'_fake_card_'+(c+1));
        imageCard.classList = '';
        imageCard.style.height = measureCard.height+'px';
        imageCard.style.width = measureCard.width+'px';
        imageCard.style.marginLeft = '';
        imageCard.style.marginRight = '';
        imageCard.style.marginTop = '';
        imageCard.style.marginBottom = '';
        if (posInLine == 0) {
            imageCard.style.marginLeft = posXbase+"px";
        }
        if (actualLine == 1) {
            imageCard.style.marginTop = posYbase+"px";
        }
        imageCard.style.position = 'relative';
        if ((place != 'player1') && (posInLine > 0)) {
            //as cartas seguintes tem que cobrir 2/3 da carta anterior
            imageCard.style.marginLeft = "-"+Math.floor(measureCard.width/3*2)+"px";
        }
        posInLine += 1;
    }
}

function game_redesign_cards_create_imgs(place, nCards) {
    const place_div = document.getElementById('area_'+place +'_cards');
    place_holder = document.getElementById('place_'+place);
    let qtExist = place_div.childElementCount;
    if (!place_holder) {
        place_holder = document.getElementById(place+'_fake_card_1');
    } else {
        qtExist -= 1;
    }
    //criar cartas se existem menos que o solicitado
    if (qtExist < nCards) {
        for (let i=qtExist; i < nCards; i++) {
            element = document.createElement("img");
            let image_id = place+'_fake_card_'+(i+1);
            //console.log(' designing '+image_id);
            element.id = image_id;
            place_div.appendChild(element);
            element.src = "http://localhost/buraco_php/imgs/cards/versos/verso-folhas.gif";
            element.classList = place_holder.classList;
        }
        if (document.getElementById('place_'+place))
            {   place_holder.style.display = 'none'; }
    } else {
    //eliminar cards se existirem mais que o solicitado
        for (let i=qtExist; i > nCards; i--) {
            let image_id = place+'_fake_card_'+i;
            //console.log('removing '+image_id);
            document.getElementById(image_id).remove();
        }
    }
}

function game_redesign_cards_invert_measures(measureObj) {
    const baseH = measureObj.height;
    const baseW = measureObj.width;
    measureObj.height = baseW;
    measureObj.width = baseH;
    return measureObj;
}

function game_redesign_cards_calculate_card(nCards,  measureContainer, measureBase){
    /*if (measureContainer.orientation == 'vertical') {
        measureBase = game_redesign_cards_invert_measures(measureBase);
        measureContainer = game_redesign_cards_invert_measures(measureContainer);
    }*/
    measureContainer.height = measureContainer.height*0.95;
    measureContainer.width = measureContainer.width*0.95;
    const propCard = measureBase.proportion;
    const propContainer = (measureContainer.width/measureContainer.height);
    const propBase = (propContainer/propCard);
    console.log(measureBase);
    console.log(measureContainer);
    console.log('propCard '+propCard);
    console.log('propContainer '+propContainer);
    console.log('propBase '+propBase);
    //valores iniciais caso o qtlinhas seja 0
    let cardHeight = Math.floor(measureContainer.height);
    let cardWidth = Math.floor(cardHeight * propCard);
    let qtLines = Math.floor(nCards/propBase);
    if (qtLines > 2) { qtLines = 2; }
    console.log('qtLines '+qtLines);
    let cardsPerLine = nCards;
    let cardsTotal = 0;

    if (qtLines > 0) {
        if (qtLines == 1) {
            cardWidth = Math.floor(measureContainer.width/nCards);
            cardHeight = Math.floor(cardWidth / propCard);
        } else {
            do {
                cardHeight = Math.floor(measureContainer.height/qtLines);
                cardWidth = Math.floor(cardHeight * propCard);
                cardsPerLine = measureContainer.width/cardWidth;
                cardsTotal = cardsPerLine*qtLines;
                console.log('qtlines '+qtLines+', cardsPerline '+cardsPerLine + ', cardsTotal '+cardsTotal);
                qtLines += 1;
            } while (nCards > cardsTotal)
            qtLines -= 1;
        }
    }
    const measureCard = new Object();
    
    measureCard.width = cardWidth;
    measureCard.height = cardHeight;
    measureCard.qtLines = qtLines;
    measureContainer.height = measureContainer.height/0.95;
    measureContainer.width = measureContainer.width/0.95;
    return measureCard;
}