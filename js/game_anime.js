//funções de animação das cartas

function game_anime_start_round(retorno) {
    const places = ['morto1', 'player4', 'player2', 'morto2', 'player3', 'player1'];
    const positions = game_anime_start_get_positions(places);
    console.log(positions);
    const position_base = game_anime_get_positions_item('place_monte');
    
    let i = 1;
    step_move_card = setInterval(()=> {
        console.log('starting step_mov_card '+i);
        game_anime_start_round_cards_to_places(places, positions, position_base, i);
        i++;
        if (i > 11) {
            console.log('i_controlcard > 11 '); 
            clearInterval(step_move_card); 
            //exit;
        }
    }, 330);    
}

function game_anime_start_round_cards_to_places(places, positions, position_base, index_card) {
    let p = 1;
    let step_move_place = null ;
    step_move_place = setInterval(()=> {
        place = places[p-1];
        let image_id = place+'_fake_card_'+index_card;
        console.log('create fake card for '+image_id);
        const fake_card = game_anime_fake_card_create(position_base, image_id);
        game_anime_fake_card_anime(fake_card, position_base, positions[place]);
        p++;
        if (p > 6) {
            console.log('indexcard '+index_card+' place ' +place +' >6 '); 
            clearInterval(step_move_place);
        } 
    }, 110);
}

function game_anime_fake_card_anime(fake_card, source, destiny) {

    const steps = new Object();
    for (var prop in source) {
        steps[prop] = (destiny[prop] - source[prop])/100;
    }
    let step_move = null;
    let i=1;
    game_anime_play_aleatory_sound('sound_take_card');
    step_move = setInterval(()=> {
        //console.log('step move '+i);
        game_anime_step_move(fake_card, source, steps, i);
        i++;
        if (i > 100) { 
            game_anime_play_aleatory_sound('sound_take_card');
            clearInterval(step_move); 
        }
    }, 1);
    
}

function game_anime_play_aleatory_sound(group_sound){
    let index = Math.floor(Math.random() * 5);
    let sound_id = group_sound+'_'+index;
    
    let beat = document.getElementById(sound_id);
    console.log(sound_id);
    beat.play();
}
function game_anime_step_move(fake_card, source, steps, multiply) {
    fake_card.style.top = (source.posY + steps.posY*multiply) + 'px';
    fake_card.style.left = (source.posX + steps.posX*multiply) + 'px';
    fake_card.style.height = (source.height + steps.height*multiply) + 'px';
    fake_card.style.width = (source.width + steps.width*multiply) + 'px';
}

function  game_anime_fake_card_create(position_base, image_id) {
    element = document.createElement("img");
    element.id = image_id;
    document.getElementById('container_fake_card').appendChild(element);
    element.src = "http://localhost/buraco_php/imgs/cards/versos/verso-folhas.gif";
    element.style.position = 'absolute';
    element.style.top      = position_base.posY + 'px';
    element.style.left     = position_base.posX + 'px';
    element.style.height   = position_base.height + 'px';
    element.style.width    = position_base.width + 'px';
    return element;
}

function game_anime_start_get_positions() {
    const positions = new Object();
    positions.player1 = game_anime_get_positions_item('place_player1');
    positions.player2 = game_anime_get_positions_item('place_player2');
    positions.player3 = game_anime_get_positions_item('place_player3');
    positions.player4 = game_anime_get_positions_item('place_player4');
    positions.morto1 = game_anime_get_positions_item('place_morto1');
    positions.morto2 = game_anime_get_positions_item('place_morto2');

    return positions;
}

function game_anime_get_positions_item(elem_name) {
    const elem_pos = new Object();
    console.log('get element '+elem_name); 
    const element = document.getElementById(elem_name);
    elem_pos.posX = element.getBoundingClientRect().left;
    elem_pos.posY = element.getBoundingClientRect().top;
    elem_pos.height = element.offsetHeight;
    elem_pos.width = element.offsetWidth;

    return elem_pos;
}