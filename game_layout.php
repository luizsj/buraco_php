<?php

function game_start_new_get_html() {
    $texto = '
    <div id=area_game>
        <div id=area_player_4>
            area_player_4
        </div>
        <div id=area_game_02>
            <div id=area_player_3>
                area_player_3
            </div>
            <div id=area_team_robot_games>
                area_team_robot_games
            </div>
            <div id=area_team_human_games>
                area_team_human_games
            </div>
        </div>
        <div id=area_player_2 >
            area_player_2
        </div>

        <div id=area_game_04 >
            area_game_04
        </div>
        <div id=area_player_1>
            area_player_1
        </div>
        <div id=area_game_05 >
            area_game_05
        </div>
    </div>';
    echo($texto);
}

?>