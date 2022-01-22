<?php

function game_start_new_get_html() {
    $texto = '
    <div id=area_game>
        <div id=area_player_4>
            <div id=area_player_4_icons class="cards_align_center">
               <img src="imgs/players/robot_4.png" class="robot_lateral">
            </div>
            <div id=area_player_4_cards class="cards_align_center">
                <img src="imgs/cards/versos/placeholder_lateral.gif" class="img_card_lateral">
            </div>
        </div>
        <div id=area_game_02>
            <div id=area_player_3>
                <div id=area_player_3_cards class="cards_align_center">
                    <img src="imgs/cards/versos/placeholder.gif" class="img_card_team_human">
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
                <img src="imgs/cards/versos/placeholder_lateral.gif" class="img_card_lateral">
            </div>
            <div id=area_player_2_icons  class="cards_align_center">
                <img src="imgs/players/robot_2.png" class="robot_lateral">
            </div>
        </div>

        <div id=area_game_04 class="area_monte_geral">
            <div id=area_monte class="area_monte">
                <img src="imgs/cards/versos/monte-folhas_lateral.gif" class="img_monte">
                <img src="imgs/cards/versos/monte-folhas_carta.gif" class="img_monte">
            </div>
            <div id=area_lixo class="area_monte">
                <img src="imgs/cards/versos/placeholder.gif" class="img_lixo">
            </div>
        </div>
        <div id=area_player_1>
            <div id=area_player_1_icons  class="cards_align_center">
                <img src="imgs/players/user.png" class="robot_team_human">
            </div>
            <div id=area_player_1_cards class="cards_align_center">
                <img src="imgs/cards/versos/placeholder.gif" class="img_card_team_human">
            </div>
        </div>
        <div id=area_game_05 class="area_monte_geral">
            <div id=area_morto01 class="area_monte area_lixo">
                <img src="imgs/cards/versos/verso-azul.gif" class="img_lixo">
            </div>
            <div id=area_morto02 class="area_monte area_lixo">
                <img src="imgs/cards/versos/verso-vermelho.gif" class="img_lixo">
            </div>
        </div>
    </div>';
    echo($texto);
}

?>