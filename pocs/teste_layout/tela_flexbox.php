<?php

include('../home.php');

$texto = tela_header();
$texto .= home_navbar();
$texto .= '
    <div id=area_game>
        <div id=area_game_01>
            <div id=area_player_4>
                P.4
            </div>
            <div id=area_game_02>
                <div id=area_player_3>
                area_game/ area_game_02/ area_player_3
                </div>
                <div id=area_team_robot_games>
                area_game/ area_game_02/ area_team_robot_games
                </div>
                <div id=area_team_human_games>
                area_game/ area_game_02/ area_team_human_games
                </div>
            </div>
            <div id=area_player_2 >
                P.2
            </div>
        </div>

        <div id=area_game_03 >
            <div id=area_game_04 >
            .
            </div>
            <div id=area_player_1>
            .
            </div>
            <div id=area_game_05 >
            .
            </div>
        </div>

    </div>';

$texto .= home_footer();

echo($texto);


function tela_header()
{
    $texto = "<!DOCTYPE HTML>
    <html lang=\"pt-br\">
    <head>
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">
        <meta http-equiv=\"Content-Type\" content=\"text/html\" />
        <meta charset=\"UTF-8\">
        <meta name=\"language\" content=\"pt-br\" />

        <link rel=\"stylesheet\" href=\"../css/font_awesome_all.css\" />
        <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\"
             integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" 
             crossorigin=\"anonymous\">
        <link href=\"https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css\" 
            rel=\"stylesheet\">
        <script type=\"text/javascript\" 
                src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\" 
                integrity=\"sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p\" 
                crossorigin=\"anonymous\">
        </script>
        <script type=\"text/javascript\" 
                src=\"https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js\">
        </script>

        <link rel=\"stylesheet\" href=\"../css/bootstrap/reboot_my_defaults.css\" />
        <link rel=\"stylesheet\" href=\"../css/geral.css\" />
        <link rel=\"stylesheet\" href=\"tela_flexbox.css\" />
        <script type=\"text/javascript\" src=\"../js/geral.js\"></script> 
        
 
        
        <title>Buraco Araucária</title>
        <base target=\"_self\" />
    </head>
    <body>
    <div class=\"container-fluid p-2\">
    ";  
    return $texto;
}

?>