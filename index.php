<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('bd/bd.php');
include('geral.php');
include('users.php');
include('fnajax.php');

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