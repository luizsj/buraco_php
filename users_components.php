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
    $text = '<p>Aqui vai um botão para continuar o último jogo suspenso,
    se houver,
    e um botão para iniciar um novo jogo
    </p>';
    return $text;  
}

?>