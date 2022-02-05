function design_p1_redesign(cardGroups) {
    let place_div = document.getElementById('area_player1_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, 0.95);
    console.log(measureContainer);
    let baseH = measureContainer.height;
    const idealH = (document.getElementById('area_morto1').offsetHeight
                    + document.getElementById('area_morto2').offsetHeight)*0.95;
    place_div.classList = '';
    place_div.style.textAlign = 'center';
    place_div.style.verticalAlign = 'middle';
    
    place_div.innerHTML = design_p1_card_groups_html(cardGroups, baseH);
    setTimeout(()=> { design_p1_recheck_size(place_div, baseH, idealH, 1) }, 300);
}

function design_p1_recheck_size(place_div, baseH, idealH, passo) {
    //chamado após timeout de 200ms
    //pega o height atual do div (containerH)
    //  se for maior que o baseH
    //      calcula um novo baseH com a proporção baseH/containerH
    //      e chama uma função para redimensionar as imagens
    newbaseH = baseH;
    if (passo < 20) {
        let measureContainer = game_redesign_get_place_measures(place_div, 0.95);
        //altura atual do div
        let containerH = Math.floor(measureContainer.height);
        let prop = idealH/containerH;
        if (prop < 0.6)
            {   prop = prop * 1.6; }
        console.log('passo '+passo + ', baseH '+baseH+', containerH '+containerH + ', idealH '+idealH+', prop '+prop);
        if ((prop < 0.99)  ) {
            newbaseH = Math.floor(baseH*0.9);
            design_p1_card_groups_recalc_height(place_div, newbaseH);
            setTimeout(()=> { design_p1_recheck_size(place_div, newbaseH, idealH, passo +1) }, 100);        
        } 
    }
}

function design_p1_card_groups_recalc_height(place_div, baseH) {
    //pega os elementos internos do div, que são os spans
    //para cada um , pega as imagens internas
    //      e redimensiona
    const baseW = Math.floor(baseH/4*2.7);
    const baseML = Math.floor(baseW/3*2);
    console.log('desenhar HTML : baseH '+(baseH)+', baseW '+baseW );
    const spans = place_div.children;
    for (let s =0; s < spans.length; s++) {
        let span = spans[s];
        let imgs = span.children;
        for (let i=0; i < imgs.length; i++) {
            img = imgs[i];
            //console.log('s'+s+'i'+i+':'+img.id);
            img.style.height = baseH+'px';
            if (img.style.marginLeft != '') {
                img.style.marginLeft = '-'+baseML+'px';
            }
        }
    }
}

function design_p1_card_groups_html(cardGroups, baseH) {
    let textGroup = '';
    let countCards = 0;
    let value = '';
    let text = '';
    let naipe = '';
    let pastaImg = '';
    let arquivoImg = '';
    let styleImg = '';
    const baseW = Math.floor(baseH/4*2.7);
    console.log('desenhar HTML inicial: baseH '+(baseH)+', baseW '+baseW );
    let cardGroup = new Object();
    for (let i=0; i < cardGroups.length; i++) {
        cardGroup = cardGroups[i];
        value = cardGroup.value;
        textGroup = "<span class=img_nowrap id=span_"+i+">";
        for (let j=0; j < cardGroup.listNaipes.length; j++) {
            naipe = cardGroup.listNaipes[j];
            //se for a última carta do grupo, pega o modelo02 (valor ocupa carta)
            //  se não for a última pega o modelo01 que tem o valor no canto esquerdo da carta
            pastaImg = (j == (cardGroup.listNaipes.length-1)) ? 'modelo02' : 'modelo01';
            arquivoImg = pastaImg+'/'+value+'-'+naipe+'.gif';
            textGroup += '<img src="../../imgs/cards/'+arquivoImg+'"';
            textGroup += ' id=player1_card_'+countCards;
            styleImg = ' style="height:'+baseH+'px;';
            // a partir da 2a carta, poe margin-left de forma que exibe só 1/3 da anterior
            if (j > 0) {
                styleImg += 'margin-left:-'+Math.floor(baseW/3*2)+'px;';
            }
            textGroup += styleImg + '">';
            countCards += 1;
        }
        textGroup += "</span> "; //precisa ter o espaço para quebrar a linha
                                // nas mudanças de grupo
        text += textGroup;
    }
    return text;
}