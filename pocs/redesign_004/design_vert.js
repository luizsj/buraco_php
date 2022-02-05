function design_vert_redesign(nCards, player) {
    let place_div = document.getElementById('area_'+player+'_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, 0.95);
    console.log(measureContainer);
    let baseH = measureContainer.height;
    const idealH = Math.floor((11/12)*0.73*0.90*(screen.availHeight*0.95))
    if (baseH > idealH) {
        baseH = idealH;
    }
    place_div.classList = '';
    place_div.style.textAlign = 'center';
    place_div.style.verticalAlign = 'middle';
    
    place_div.innerHTML = design_vert_cards_html(nCards, baseH, player);
    setTimeout(()=> { design_vert_recheck_size(place_div, baseH, idealH, 1) }, 300);
}

function design_vert_recheck_size(place_div, baseH, idealH, passo) {
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
        if ((prop < 0.99)) {
            newbaseH = Math.floor(baseH*0.9);
            design_vert_card_groups_recalc_height(place_div, newbaseH);
            setTimeout(()=> { design_vert_recheck_size(place_div, newbaseH, idealH, passo +1) }, 100);        
        } 
    }
}

function design_vert_card_groups_recalc_height(place_div, baseH) {
    //pega os elementos internos do div, que são os spans
    //para cada um , pega as imagens internas
    //      e redimensiona
    const baseW = Math.floor(baseH/4*2.7);
    const baseML = Math.floor(baseW/3*2);
    console.log('desenhar HTML : baseH '+(baseH)+', baseW '+baseW );
    const imgs = place_div.children;
    for (let i=0; i < imgs.length; i++) {
        img = imgs[i];
        //console.log('s'+s+'i'+i+':'+img.id);
        img.style.height = baseH+'px';
        if (img.style.marginLeft != '') {
            img.style.marginLeft = '-'+baseML+'px';
        }
    }
}

function design_vert_cards_html(nCards, baseH, player) {
    let text = '';
    const baseW = Math.floor(baseH/4*2.7);
    console.log('desenhar HTML inicial: baseH '+(baseH)+', baseW '+baseW );
    for (let i=0; i < nCards; i++) {
        text += '<img src="../../imgs/cards/versos/verso-folhas.gif"';
        text += ' id='+player+'_card_'+i;
        text += ' style="height:'+baseH+'px;';
        // a partir da 2a carta, poe margin-left de forma que exibe só 1/3 da anterior
        if (i > 0) {
            text += 'margin-left:-'+Math.floor(baseW/3*2)+'px;';
        }
        text += '"> ';
        //dconsole.log(text);
    }
    return text;
}