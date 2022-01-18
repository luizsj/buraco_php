function game_start_new_get_html(){
    let url = "index.php?fnajax=game_start_new_get_html";
    let posexec = "game_start_round();";
    geral_ajax(url, 'area_principal', '', posexec);
}

function game_start_round(){
    //inicializa objetos no servidor
    //recebe a distribuição de cartas do usuário
    //recebe o número do primeiro jogador
    console.log('falta implementar start round');
}