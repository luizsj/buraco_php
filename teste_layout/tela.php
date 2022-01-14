<?php

include('../home.php');

$texto = tela_header();
$texto .= home_navbar();
$texto .= '
    <div class="container-fluid border border-info p-0" id=area_game>
        <div id=area_game_01 class="row border border-2 p-0">
            <div id=area_player_4 class="col-2 border">
            .
            </div>
            <div id=area_game_02 class="col-8 border p-0">
                <div id=area_player_3>
                .
                </div>
                <div id=area_team_robot_games>
                .
                </div>
                <div id=area_team_human_games>
                .
                </div>
            </div>
            <div id=area_player_2 class="col-2 border p-0" >
                .
            </div>
        </div>
        <div id=area_game_03 class="row border border-2 p-0">
            <div id=area_game_04 class="col-2 ">
            .
            </div>
            <div id=area_player_1 class="col-8">
            .
            </div>
            <div id=area_game_05 class="col-2 ">
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
        <link rel=\"stylesheet\" href=\"tela.css\" />
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