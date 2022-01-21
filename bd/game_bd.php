<?php

function game_bd_game_start_new() {
    $instr = "insert into games (user_id) values (?)";
    $params[0] = $_SESSION['user']['id_user'];
    $newid = bd_query_execute_return_id($instr, $params);
    return $newid;
}

function game_bd_round_start_new($game_id, $round_id, $round_status) {
    $instr = "insert into gamerounds 
                    (game_id, round_id, updated_at, init_json, last_json)
              values(   ?   , ?, current_timestamp,       ?   ,   ?)";
    $params[0] = $game_id;
    $params[1] = $round_id;
    $params[2] = json_encode($round_status);
    $params[3] = json_encode($round_status);
    bd_query_execute($instr, $params);
}

function game_bd_get_round_this_game($game_id) {
    $instr = "select max(round_id) from gamerounds
                where game_id = ?";
    $params[0] = $game_id;
    $round = bd_query_select_unique_value($instr, $params);
    if ($round == '') { $round = 0; }
    return $round;
}

function game_bd_get_round_status_last($game_id, $round_id) {
    $instr = "select last_json from gamerounds
                where game_id= ?  and round_id= ?";
    $params[0] = $game_id;
    $params[1] = $round_id;
    $last_json = bd_query_select_unique_value($instr, $params);
    $round_status = json_decode($last_json, true);
    return $round_status;
}
?>