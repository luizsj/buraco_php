<?php

function game_start_new_get_html() {
    $texto = '
    <div id=area_game>
        <div id=area_player_4>
            <div id=area_player_4_icons class="cards_align_center">
               <img src="imgs/players/robot_4.png" class="robot_lateral">
            </div>
            <div id=area_player_4_cards class="cards_align_center">
                <img id=place_player4 src="imgs/cards/versos/placeholder_lateral.gif" class="img_card_lateral">
            </div>
        </div>
        <div id=area_game_02>
            <div id=area_player_3>
                <div id=area_player_3_cards class="cards_align_center">
                    <img id=place_player3 src="imgs/cards/versos/placeholder.gif" class="img_card_team_human">
                </div>
                <div id=area_player_3_icons  class="cards_align_center">
                    <img src="imgs/players/robot_3.png" class="robot_team_human">
                </div>
            </div>
            <div id=area_team_robot_games>
                area team robot games
            </div>
            <div id=area_team_human_games>
                area team human games
            </div>
        </div>
        <div id=area_player_2 >
            <div id=area_player_2_cards class="cards_align_center">
                <img id=place_player2 src="imgs/cards/versos/placeholder_lateral.gif" class="img_card_lateral">
            </div>
            <div id=area_player_2_icons  class="cards_align_center">
                <img src="imgs/players/robot_2.png" class="robot_lateral">
            </div>
        </div>

        <div id=area_game_04 class="area_monte_geral">
            <div id=area_monte class="area_monte">
                <img src="imgs/cards/versos/monte-folhas_lateral.gif" class="img_monte">
                <img id=place_monte src="imgs/cards/versos/monte-folhas_carta.gif" class="img_monte">
            </div>
            <div id=area_lixo class="area_monte">
                <img  id=place_lixo src="imgs/cards/versos/placeholder.gif" class="img_lixo">
            </div>
        </div>
        <div id=area_player_1>
            <div id=area_player_1_icons  class="cards_align_center">
                <img src="imgs/players/user.png" class="robot_team_human">
            </div>
            <div id=area_player_1_cards class="cards_align_center">
                <img id=place_player1 src="imgs/cards/versos/placeholder.gif" class="img_card_team_human">
            </div>
        </div>
        <div id=area_game_05 class="area_monte_geral">
            <div id=area_morto01 class="area_monte area_lixo">
                <img id=place_morto1 src="imgs/cards/versos/verso-azul.gif" class="img_lixo">
            </div>
            <div id=area_morto02 class="area_monte area_lixo">
                <img id=place_morto2 src="imgs/cards/versos/verso-vermelho.gif" class="img_lixo">
            </div>
        </div>
    </div>
    <p align=center id=area_msgs></p>
    <div class="container font80 mt-3"> 
        <p class="font_negrito mt-3">
            Créditos Sounds:
        </p>
        <ul class="m-0">
            <li><audio id=sound_take_card_0 controls>
                    <source src="sounds/take_card/f4ngy__card-flip.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">f4ngy__card-flip.wav</span>
                    <a href="https://freesound.org/people/f4ngy/sounds/240776/">
                    https://freesound.org/people/f4ngy/sounds/240776/
                    </a>
            </li>
            <li><audio id=sound_take_card_1 controls>
                    <source src="sounds/take_card/johnny2810__card.mp3"  type="audio/mp3">
                </audio>
                <span class="font_negrito mr-2">johnny2810__card.mp3</span>
                    <a href="https://freesound.org/people/Johnny2810/sounds/559531/">
                    https://freesound.org/people/Johnny2810/sounds/559531/
                    </a>
            </li>
            <li><audio id=sound_take_card_2 controls>
                    <source src="sounds/take_card/dersuperanton__taking-card.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">dersuperanton__taking-card.wav</span>
                    <a href="https://freesound.org/people/dersuperanton/sounds/434472/">
                    https://freesound.org/people/dersuperanton/sounds/434472/
                    </a>
            </li>
            <li><audio id=sound_take_card_3 controls>
                    <source src="sounds/take_card/paul-sinnett__card.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">paul-sinnett__card.wav</span>
                    <a href="https://freesound.org/people/Paul%20Sinnett/sounds/404015/">
                    https://freesound.org/people/Paul%20Sinnett/sounds/404015/
                    </a>
            </li>
            <li><audio id=sound_take_card_4 controls>
                    <source src="sounds/take_card/themfish__slap-cards.wav" type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">themfish__slap-cards.wav</span>
                    <a href="https://freesound.org/people/themfish/sounds/45821/">
                    https://freesound.org/people/themfish/sounds/45821/
                    </a>
            </li>
        </ul>
    </div>     
    <div id=container_fake_card></div>
        ';
    echo($texto);
}

?>