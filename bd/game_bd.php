<?php

function game_bd_game_start_new() {
    $instr = "insert into games (user_id) values (?)";
    $params[0] = $_SESSION['user']['id_user'];
    $newid = bd_query_execute_return_id($instr, $params);
    return $newid;
}

?>