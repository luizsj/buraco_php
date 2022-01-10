<?php

function users_bd_check_exist($dados) {
    $instr = "select count(*) from users where lower(username) = lower(?) or lower(email) = lower(?)";
    $params[0] = $dados['username'];
    $params[1] = $dados['email'];

    $exist = bd_query_select_unique_value($instr, $params);
    return $exist;
}

function users_bd_new_save($dados) {
    $instr = "insert into users (username, email, hashed_password) values (?, lower(?), ?)";
    $params[0] = $dados['username'];
    $params[1] = $dados['email'];
    $params[2] = password_hash($dados['password'], PASSWORD_DEFAULT);
    $newid = bd_query_execute_return_id($instr, $params);
    return $newid;
}

function users_bd_get_hashed_password($email) {
    $instr = "select hashed_password from users where lower(email) = lower(?)";
    $params[0] = $email;
    $hashed = bd_query_select_unique_value($instr, $params);
    return $hashed;
}

function users_bd_login_get_dados($dados) {
    $instr = "select id id_user, username from users where lower(email) = lower(?)";
    $params[0] = $dados['email'];
    $returned = bd_query_select_unique_row($instr, $params);
    $dados['id_user'] = $returned['id_user'];
    $dados['username'] = $returned['username'];
    return $dados;
}
?>