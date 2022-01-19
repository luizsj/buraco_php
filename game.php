<?php

session_set_cookie_params(["sameSite" => "Strict"]); //none, lax, strict
session_set_cookie_params(["Secure" => "true"]); //false, true
session_set_cookie_params(["HttpOnly" => "true"]); //false, true
session_start([
    'cookie_lifetime' => 86400,
]);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('bd/bd.php');
include('bd/game_bd.php');
include('game_baralho.php');

if (!isset($_GET['fnajax'])) {
    echo("<p>Chamada inválida");
} else {
    $function_to_call = $_GET['fnajax'];
    if (function_exists($function_to_call)) {
        $result = $function_to_call();
        
        header("Content-Type: application/json");
        if (is_array($result)){
            $json = json_encode($result);
        } else { $json = false;}
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(["jsonError" => json_last_error_msg()]);
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError":"unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }
        echo $json; exit;
    } else {
        echo("função ".$function_to_call." não existe!");
    }
}

function game_round_start(){
    if (!isset($_SESSION['game']['id'])) {
        //$game_id = game_bd_game_start_new();
        //$round_id = game_bd_round_start_new($game_id);
        $round_status = game_round_start_object();
        //$_SESSION['game']['id'] = $game_id;
        //$_SESSION['game']['round_id'] = $round_id;
    }
    return $round_status;
}

function game_round_start_object()
{
    //gera um baralho misturado
    $baralho = game_baralho_start();
    return $baralho;
}

?>