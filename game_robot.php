<?php

function game_call_player_robot() {
    $actualPlayer = $_SESSION['nextplayer'];
    $_SESSION['actualPlay']['player'] = $actualPlayer;
    $playerCards = $_SESSION['distrib']['player'.$actualPlayer];
        //executa a primeira compra de cartas
        //retorna um array [face][naipe, naipe, naipe], [face][naipe, naipe, naipe], ...
    $playerCardsSorted = game_call_player_robot_buy_cards($actualPlayer, $playerCards);
    $team = ($actualPlayer == 3) ? 'human' : 'robot';
    $playerCardsSorted = game_call_player_robot_decide_3_red($team, $playerCardsSorted);
    
    
}

function game_call_player_robot_decide_3_red($team, $playerCardsSorted) {
    //se tiver 3 vermelhos,  para cada um
    //retira do playerCardsSorted, coloca no array de cartas na mesa
    //e compra mais uma do baralho
    $card['face'] = 3;
    if (isset($playerCardsSorted[3])) {
        $naipes = $playerCardsSorted[3]; //um array de naipes [0..n]
        $sobra = $naipes;               //se usar cartas, retira deste array
                                        //assim mantém o loop For no array original
        $countNaipes = count($naipes);
        for ($i=0; $i < count($naipes); $i++) {
            $naipe = $naipes[$i];
            if (($naipe == 'ouros') or ($naipe == 'copas')) {
                //se encontra carta 3-vermelho, primeiro joga na mesa
                $card['naipe'] = $naipe;
                $_SESSION['cardsOnTable'][$team][3][0][] = $card;
                //depois atualiza o array de naipes que sobram
                for ($j=0; $j < count($sobra); $j++) {
                    if ($sobra[$j] == $naipe) {
                        array_splice($sobra, 1, $j);
                    }
                }
                //depois compra mais uma carta
                $cartaComprada = array_pop($_SESSION['baralho']);
                //se for um 3, adiciona no array de naipes
                if ($cartaComprada['face'] == 3) {
                    $naipes[] = $cartaComprada['naipe'];
                    $sobra[] = $cartaComprada['naipe'];
                    $countNaipes += 1;
                } else {
                    $playerCardsSorted[$cartaComprada['face']][] = $cartaComprada['naipe'];
                }
            }
        }
        //se não sobrou nenhuma, eliminar o cads[3]
        if (count($sobra) == 0) {
            unset($playerCardsSorted[3]);
        } else {
            $playerCardsSorted[3] = $sobra;
        }
    }
    return $playerCardsSorted;
}

function game_call_player_robot_buy_cards($actualPlayer, $playerCards) {
    $whatBuy = game_call_player_robot_decide_what_buy($actualPlayer, $_SESSION['garbage'], $playerCards);
    //executar Compra de Cartas
    $_SESSION['actualPlay']['buyFrom'] = $whatBuy;
    if ($whatBuy == 'baralho') {
        $carta = array_pop($_SESSION['baralho']);
        $playerCards[] = $carta;
        $carta = array_pop($_SESSION['baralho']);
        $playerCards[] = $carta;        
    } else {
        $playerCards[] = array_merge($playerCards, $_SESSION['garbage']['cards']);
        $_SESSION['garbage']['cards'] = [];
        $_SESSION['garbage']['closedUntil'] = 0;
    }
    $playerCardsSorted = game_sort_cards_by_value($playerCards);
    return $playerCardsSorted;
}

function game_call_player_robot_decide_what_buy($actualPlayer, $garbage, $playerCards) {
    //decidir se compra do baralho ou do lixo
    $whatBuy = 'baralho';
    if ((count($garbage['cards']) > 1) && (count($playerCards) > 1)) {
        if (    ($garbage['closedUntil'] == 0)
             or ($garbage['closedUntil'] == $actualPlayer)
            ) {
            $lastIndex = count($garbage['cards'])-1;
            $lastCardValue = $garbage['cards'][$lastIndex]['face'];
            if (!(in_array($lastCardValue, array('2', '3', 'C')))) {
            //agora precisa verificar se no playerCards tem 2 ou mais cartas deste mesmo valor
                $countMatches = 0;
                for ($i=0; $i < count($playerCards); $i++) {
                    $carta = $playerCards[$i];
                    if ($carta['face'] == $lastCardValue) {
                        $countMatches += 1;
                    }
                }
                if ($countMatches > 1) {
                    $whatBuy = 'garbage';
                }
            }
        }
    }
    return $whatBuy;
}

?>