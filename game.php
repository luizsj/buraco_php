<?php

session_set_cookie_params(["sameSite" => "Strict"]); //none, lax, strict
session_set_cookie_params(["Secure" => "true"]); //false, true
session_set_cookie_params(["HttpOnly" => "true"]); //false, true
session_start([
    'cookie_lifetime' => 86400,
]);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
session_set_cookie_params(86400);
ini_set('session.gc_maxlifetime', 86400);
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
        //o retorno deve ser sempre um array
        header("Content-Type: application/json");
        if (is_array($result)){
            $result = game_extract_status($result);
            
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

function game_extract_status($dados) {
/*    $dados['baralho'] = $baralho;
$dados['distrib'] = $distrib;
$dados['garbage']['cards'] = [];
$dados['garbage']['closed_until'] = 0;
$dados['games']['human'] = [];
$dados['games']['robot'] = [];
$dados['deadcards']['human']['player'] = 0;
$dados['deadcards']['robot']['player'] = 0;
$dados['deadcards']['human']['status'] = '';
$dados['deadcards']['robot']['status'] = '';
$dados['nextplayer'] = random_int(1, 4); */
    $result['qtbaralho'] = count($dados['baralho']);
    $result['player1_cards'] = $dados['distrib']['player1'];
    $result['qtcards']['player2'] = count($dados['distrib']['player2']);
    $result['qtcards']['player3'] = count($dados['distrib']['player3']);
    $result['qtcards']['player4'] = count($dados['distrib']['player4']);
    $result['garbage'] = $dados['garbage'];
    $result['deadcards'] = $dados['deadcards'];
    $result['nextplayer'] = $dados['nextplayer'];
    $result['game_id'] = $_SESSION['game']['id'];
    $result['round_id'] = $_SESSION['game']['round_id'];

    return $result;

}

function game_round_start(){
    if (!isset($_SESSION['game']['id'])) {
        $game_id = game_bd_game_start_new();
        $_SESSION['game']['id'] = $game_id;
    } else {
        $game_id = $_SESSION['game']['id'];
    }
    $its_ok = false;
    if (!isset($_SESSION['game']['round_id'])) {
        $round_id = game_bd_get_round_this_game($game_id);
        if ($round_id == 0) {
            $round_id = 1;
            $round_status = game_round_start_object();
            game_bd_round_start_new($game_id, $round_id, $round_status);
            $its_ok = true;
        } 
        $_SESSION['game']['round_id'] = $round_id;
    } else {
        $round_id = $_SESSION['game']['round_id'];
    }

    if (!$its_ok) {
        $round_status = game_bd_get_round_status_last($game_id, $round_id);
    }
    $_SESSION['game']['round_status'] = $round_status;

   
    return $round_status;
}

function game_round_start_object()
{
    //gera um baralho misturado
    $baralho = game_baralho_start();
    $distrib = game_baralho_distribuir($baralho);
    //passa baralho por referência
    //      então as cartas distribuídas diminuem neste array
    //e retorna um array com as cartas distribuidas
    //para os jogadores e para os mortos
    $dados['baralho'] = $baralho;
    $dados['distrib'] = $distrib;
    $dados['garbage']['cards'] = [];
    $dados['garbage']['closed_until'] = 0;
    $dados['games']['human'] = [];
    $dados['games']['robot'] = [];
    $dados['deadcards']['human']['player'] = 0;
    $dados['deadcards']['robot']['player'] = 0;
    $dados['deadcards']['human']['status'] = '';
    $dados['deadcards']['robot']['status'] = '';
    $dados['nextplayer'] = random_int(1, 4);
    $_SESSION['game']['last_status'] = $dados;
    return $dados;
}

?>