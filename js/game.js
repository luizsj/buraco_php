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
    geral_ajax_json(url, 'area_player_1_msg', 'Iniciando Rodada', game_anime_round_start, false);
}


function game_anime_round_start(retorno) {
    let dados = JSON.parse(retorno);
    console.log(dados);
}