function design_vert_redesign(nCards, player) {
    let place_div = document.getElementById('area_'+player+'_cards');
    let measureContainer = game_redesign_get_place_measures(place_div, 0.95);
    console.log(measureContainer);
    let baseW = measureContainer.width*0.9;
    let baseH = Math.floor(baseW/4.0*2.7);
    let idealH = Math.floor((11/12)*0.73*0.90*(screen.availHeight*0.90));
    const containerH = measureContainer.height;
    if (idealH > containerH) {
        idealH = containerH;
    }
    place_div.classList = '';
    place_div.style.textAlign = 'center';
    place_div.style.verticalAlign = 'middle';
    
    place_div.innerHTML = design_vert_cards_html(nCards, baseH, player);
    setTimeout(()=> { design_vert_recheck_size(player, place_div, baseH, idealH, 1) }, 300);
}

function design_vert_recheck_size(player, place_div, baseH, idealH, passo) {
    //chamado após timeout de 200ms
    //pega o height atual do div (containerH)
    //  se for maior que o baseH
    //      calcula um novo baseH com a proporção baseH/containerH
    //      e chama uma função para redimensionar as imagens
    newbaseH = baseH;
    if (passo < 20) {
        let measureContainer = game_redesign_get_place_measures(place_div, 0.95);
        //altura atual do div
        let containerH = Math.floor(measureContainer.height)*0.95;
        let prop = idealH/containerH;
        if (prop < 0.6)
            {   prop = prop * 1.6; }
       // console.log(player + ', passo '+passo + ', baseH '+baseH+', containerH '+containerH + ', idealH '+idealH+', prop '+prop);
        if ((prop < 0.99)) {
            newbaseH = Math.floor(baseH*0.9);
            const repass_baseH = newbaseH;
            design_vert_card_groups_recalc_height(place_div, newbaseH);
            setTimeout(()=> { design_vert_recheck_size(player, place_div, repass_baseH, idealH, passo +1) }, 100);        
        } else {
            document.getElementById(player+'_ok').value = "1";
            game_start_round_check_next_player();
        }
    }
}

function design_vert_card_groups_recalc_height(place_div, baseH) {
    //pega os elementos internos do div, que são os spans
    //para cada um , pega as imagens internas
    //      e redimensiona
    const baseW = Math.floor(baseH/2.7*4.0);
    const baseMT = Math.floor(baseH/3*2);
    //console.log('desenhar HTML : baseH '+(baseH)+', baseW '+baseW );
    const imgs = place_div.children;
    for (let i=0; i < imgs.length; i++) {
        img = imgs[i];
        //console.log('s'+s+'i'+i+':'+img.id);
        img.style.height = baseH+'px';
        if (img.style.marginTop != '') {
            img.style.marginTop = '-'+baseMT+'px';
        }
    }
}

function design_vert_cards_html(nCards, baseH, player) {
    let text = '';
    const baseW = Math.floor(baseH/2.7*4.0);
    //console.log('desenhar HTML inicial: baseH '+(baseH)+', baseW '+baseW );
    for (let i=0; i < nCards; i++) {
        text += '<img src="imgs/cards/versos/verso-folhas-lateral.gif"';
        text += ' id='+player+'_card_'+i;
        text += ' style="height:'+baseH+'px;';
        // a partir da 2a carta, poe margin-top de forma que exibe só 1/3 da anterior
        if (i > 0) {
            text += 'margin-top:-'+Math.floor(baseH/3*2)+'px;';
        }
        text += '"> ';
        //dconsole.log(text);
    }
    return text;
}