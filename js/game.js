function game_start_new_get_html(){
    let url = "index.php?fnajax=game_start_new_get_html";
    let posexec = "game_start_round();";
    geral_ajax(url, 'area_principal', '', posexec);
}

function game_start_round(){
    //inicializa objetos no servidor
    //recebe a distribuição de cartas do usuário
    //recebe o número do primeiro jogador
    let url = "game.php?fnajax=game_round_start";
    //let fn_posexec(json_retorno) => game_anime_start_round(json_retorno);
    geral_ajax_json(url, 'area_msgs', 'Iniciando Rodada', game_start_round_continue, false);
}


function game_start_round_continue(retorno) {
    let dados = JSON.parse(retorno);
    console.log(dados);
    //animação da distribuição inicial de cartas
    //é necessário chamar como timeout
    //para garantir que a tela tenha sido redesenhada
    //e todos os componentes estejam já em suas posições
    setTimeout(function(){ game_anime_start_round(dados); }, 500);
}

function game_start_round_check_next_player() {
    const p1_ok = parseInt(document.getElementById('player1_ok').value);
    const p2_ok = parseInt(document.getElementById('player2_ok').value);
    const p3_ok = parseInt(document.getElementById('player3_ok').value);
    const p4_ok = parseInt(document.getElementById('player4_ok').value);
    
    if ((p1_ok+p2_ok+p3_ok+p4_ok) == 4) {
        const nextPlayer = document.getElementById('next_player').value;
        game_show_centered_warning('N.'+nextPlayer+' está jogando agora');
        if (nextPlayer != 1) {
            setTimeout(()=> {game_call_player_robot(nextPlayer);}, 200);
        }
    } else {
        console.log('p1: '+p1_ok+', p2: '+p2_ok+', p3: '+p3_ok+', p4: '+p4_ok+', soma:'+(p1_ok+p2_ok+p3_ok+p4_ok));
    }
}

function game_show_centered_warning(mensagem) {
    const area_msgs = document.getElementById('area_msgs');
    area_msgs.innerHTML = mensagem;
    area_msgs.className = 'area_msgs_show';
}

function game_call_player_robot(nPlayer) {
    document.getElementById('area_player_'+nPlayer).style.backgroundColor = '#3c9bff';
    let url = "game.php?fnajax=game_call_player_robot";
    //let fn_posexec(json_retorno) => game_anime_start_round(json_retorno);
    geral_ajax_json(url, 'area_msgs', 'Executando Jogador '+nPlayer, game_call_player_robot_continue, false);
}

function game_call_player_robot_continue(retorno) {
    console.log(retorno);
}