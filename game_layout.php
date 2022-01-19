<?php

function game_start_new_get_html() {
    $texto = '
    <div id=area_game>
        <div id=area_player_4>
            area player 4
        </div>
        <div id=area_game_02>
            <div id=area_player_3>
                area player 3
            </div>
            <div id=area_team_robot_games>
                area team robot games
            </div>
            <div id=area_team_human_games>
                area team human games
            </div>
        </div>
        <div id=area_player_2 >
            area player 2
        </div>

        <div id=area_game_04 >
            area game 04
        </div>
        <div id=area_player_1>
            <span id=area_player_1_msg></span>
            area player 1
        </div>
        <div id=area_game_05 >
            area game 05
        </div>
    </div>';
    echo($texto);
}

?>