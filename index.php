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
include('geral.php');
include('users.php');
include('fnajax.php');
include('game_layout.php');

if (!isset($_GET['fnajax'])) {
    include('home.php');
    home_show();
} else {
    $function_to_call = $_GET['fnajax'];
    fnajax_verify();
    if (in_array($function_to_call, $fns)) {
        if (function_exists($function_to_call)) {
            //acessar as fns de usuário normal
            //outras fns somente se estiver logado 
            $is_users_fn = (substr($function_to_call, 0, 5) == 'users');
            if ($is_users_fn or isset($_SESSION['user'])) {
                $text = $function_to_call();
                echo($text);
            } else {
                echo('Acesso não autorizado!');
            }
        } else {
            echo('Erro Interno!<br>Função não implementada!');
        }
    } else {
        echo('Erro de Chamada!<br>Função não implementada!');
    }
}


?>