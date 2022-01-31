function game_redesign_cards_in_place(place) {
    //pegar as medidas do container
    //a lista de cartas (ids do objetos image)
    //calcular qual deve ser o width e o height novo de cada image
    //decidir se cabe em uma linha ou mais
    //proporcao das cartas deve ser 2.7x4.0
    const measure_base = new Object();
    measure_base.widht = 2.7;
    measure_base.height = 4.0;
    measure_base.proportion = 2.7/4.0;
    if (place == 'player1') {
        const place_div = document.getElementById('area_'+place +'_cards');
        const measures = game_redesign_get_place_measures(place_div, measure_base.proportion);
        if (place == 'player1') {
            measures.orientation = 'horizontal';
        }
        const list_id_cards = game_redesign_get_list_cards(place_div);
        const new_measure_card = game_redesign_cards_calc_new_measure(place, measures, list_id_cards.length);

    }
}

function game_redesign_cards_calc_new_measure(measures, qtcards) {
    //calcular o novo tamanho wXh que ter'a cada carta




    if (place == 'player1') {
        //considerar a propor'C~A
        //let test_height =
    }
}

function game_redesign_get_list_cards(element) {
    const imgs = element.getElementsByTagName("img");
    const visible_imgs = [];
    for (let i=0; i < imgs.length; i++) {
        if (imgs[i].style.display != 'none') {
            visible_imgs.push(imgs[i].id);
        }
    }
    console.log(visible_imgs);
    return visible_imgs;
}

function game_redesign_get_place_measures(element, base_prop) {
    const measures = new Object();
    measures.width = element.offsetWidth;
    measures.height = element.offsetHeight;
    measures.posX = element.getBoundingClientRect().left;
    measures.posY = element.getBoundingClientRect().top;    
    measures.orientation = 'horizontal';
    measures.proportion = measures.width/measures.height;
    if (measures.proportion < base_prop){
        measures.orientation = 'vertical';
        measures.proportion = measures.height/measures.width;
    }
    return measures;
}