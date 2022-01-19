<?php

function game_baralho_start() {
    //inicializa um baralho e embaralha as cartas
    $naipes = array('copas', 'ouros', 'espadas', 'paus');
    //não mudar essa ordem dos naipes!!!!

    $faces = array('A', 'J', 'Q', 'K');
    for ($i=2; $i <= 10; $i++) {
        $faces[] = $i;
    }
    $baralho = [];
    for ($i=0; $i < 4; $i++) {
        for ($n=0; $n < count($naipes); $n++) {
            $carta['naipe'] = $naipes[$n];
            for ($f=0; $f < count($faces); $f++) {
                $carta['face'] = $faces[$f];
                $baralho[] = $carta;
            } //terminou o naipe
            $carta['face'] = 'C'; //coringa
            if ($n == 1) {
                $carta['naipe'] = 'Vermelho';
                $baralho[] = $carta;
            }
            if ($n == 3) {
                $carta['naipe'] = 'Preto';
                $baralho[] = $carta;
            }            
        }
    }
    $baralho = game_baralho_embaralhar($baralho);
    return $baralho;
}

function game_baralho_embaralhar($base) {
    $novo= [];
    $qt = count($base);
    while ($qt > 1) {
        $n = random_int(0, $qt-1);
        $carta = $base[$n];
        array_splice($base, $n, 1);
        $novo[] = $carta;
        $qt--;
    }
    $novo[] = $base[0];
    return $novo;
}

?>