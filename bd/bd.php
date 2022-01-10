<?php

global $conn;
$host = 'localhost:3306';
$user = 'luizsoares';
$password = 'golf_card';
$database = 'site_buraco';

$conn = new mysqli($host, $user, $password, $database);


function bd_query_select_unique_value($instr, $params){
    global $conn;
    $instr = bd_query_instr_params($instr, $params);
    $result = mysqli_query($conn, $instr);
    $row = mysqli_fetch_row($result);
    return $row[0];
}

function bd_query_execute_return_id($instr, $params) {
    global $conn;
    $query = bd_query_execute($instr, $params);
    $id = mysqli_insert_id($conn);
    return $id;
}

function bd_query_execute($instr, $params){
    global $conn;
    $instr = bd_query_instr_params($instr, $params);
    $query = mysqli_query($conn, $instr);
    if ($query == '')
        {   var_dump(mysqli_error($conn)); }
    return $query;
}

function bd_query_instr_params($instr, $params) {
    global $conn;
    for ($i=0; $i < count($params); $i++){
        $pos = strpos($instr, '?');
        if ($pos !== false) {
            $replace = "'".mysqli_real_escape_string($conn, $params[$i])."'";
            $instr = substr_replace($instr, $replace, $pos, 1);
        }
    }
    return $instr;
}

function bd_query_select_unique_row($instr, $params) {
    global $conn;
    $instr = bd_query_instr_params($instr, $params);
    $result = mysqli_query($conn, $instr);
    $row = mysqli_fetch_assoc($result);
    return $row;
}
?>