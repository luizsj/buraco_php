<?php

function users_component_forgot_password() {
    $text = '
    <div class=col>
        <button class="btn btn-sm btn-secondary nowrap" onclick="users_forgot_pass();">
            Esqueci minha senha
        </button>
    </div>';
    return $text;
}
function users_component_email($email='') {
    $text = '            
    <div class="form-floating">
        <input type="email" class="form-control" id="user_email" placeholder="name@example.com" 
            value="'.$email.'" max-length=150 required>
        <label for="user_email">Email</label>
    </div>';
    return $text;
}

function users_component_password($password='') {
    $text = '            
    <div class="form-floating">
        <input type="password" class="form-control" id="user_pass" placeholder=""
            max-length=15
            value="'.$password.'" required>
        <label for="user_pass">Senha</label>
    </div>';
    return $text;
}

function users_component_alert($alert) {
    $text = '';
    if ($alert != '') {
        $text = '<p class="font80 text-danger">
                    '.$alert.'
                    </p>';
    }
    return $text;
}

function user_component_ranking() {
    $text = '<p>Aqui vai um ranking com os 5 primeiros colocados
                e a posição do usuário atual
                com o imediato anterior e posterior
            </p>';
    return $text;
}

function user_component_last_games() {
    $text = '<p>Aqui vai uma lista dos últimos jogos
                com a pontuação,
                data e tempo jogado
            </p>';
    return $text;
}

function user_component_new_game() {
    $text = users_component_suspended_game();
    $text .= '<div class="text-center m-2 border">
    <p> <button class="btn btn-success m-3 fw-bold"
            onclick="game_start_new_get_html();">
        Novo Jogo
        </button></p>
    </div>';
    return $text;  
}

function users_component_suspended_game(){
    $text = '<div class="text-center m-2 border">
            <span class="mt-1 fw-bold"> Jogo Pausado </span>
            <br>Último Lance: dd/mm hh:mm 
            <p><button class="btn btn-primary">
                Continuar
                </button></p>
            </div>';
    return $text;

}

?>