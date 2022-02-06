<?php

function home_header() {
	$vjs = '?version='.date('YmdHm');
    $texto = "<!DOCTYPE HTML>
    <html lang=\"pt-br\">
    <head>
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">
        <meta http-equiv=\"Content-Type\" content=\"text/html\" />
        <meta charset=\"UTF-8\">
        <meta name=\"language\" content=\"pt-br\" />

        <link rel=\"stylesheet\" href=\"css/font_awesome_all.css".$vjs."\" />
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

        <link rel=\"stylesheet\" href=\"css/bootstrap/reboot_my_defaults.css".$vjs."\" />
        <link rel=\"stylesheet\" href=\"css/geral.css".$vjs."\" />
        <link rel=\"stylesheet\" href=\"css/game_layout.css".$vjs."\" />
        <script type=\"text/javascript\" src=\"js/geral.js".$vjs."\"></script> 
        <script type=\"text/javascript\" src=\"js/users.js".$vjs."\"></script>
        <script type=\"text/javascript\" src=\"js/game.js".$vjs."\"></script>
        <script type=\"text/javascript\" src=\"js/game_anime.js".$vjs."\"></script>
        <script type=\"text/javascript\" src=\"js/game_redesign.js".$vjs."\"></script>
        <script type=\"text/javascript\" src=\"js/game_validate.js".$vjs."\"></script>
        <script type=\"text/javascript\" src=\"js/design_cards/design_p1.js".$vjs."\"></script>        
        <script type=\"text/javascript\" src=\"js/design_cards/design_p3.js".$vjs."\"></script>        
        <script type=\"text/javascript\" src=\"js/design_cards/design_vert.js".$vjs."\"></script>        

        <title>Buraco Araucária</title>
        <base target=\"_self\" />
    </head>
    <body>
    <div class=\"container-fluid p-2\">
    ";  
    return $texto;
}

function home_footer(){
    $texto = "</div>
        </body>
        </html>";
    return $texto;
    /* colocar isso aqui depois em uma p;ágina de créditos
       <div class="container font80 mt-3"> 
        <p class="font_negrito mt-3">
            Créditos Sounds:
        </p>
        <ul class="m-0">
            <li><audio id=sound_take_card_0 >
                    <source src="sounds/take_card/f4ngy__card-flip.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">f4ngy__card-flip.wav</span>
                    <a href="https://freesound.org/people/f4ngy/sounds/240776/">
                    https://freesound.org/people/f4ngy/sounds/240776/
                    </a>
            </li>
            <li><audio id=sound_take_card_1 >
                    <source src="sounds/take_card/johnny2810__card.mp3"  type="audio/mp3">
                </audio>
                <span class="font_negrito mr-2">johnny2810__card.mp3</span>
                    <a href="https://freesound.org/people/Johnny2810/sounds/559531/">
                    https://freesound.org/people/Johnny2810/sounds/559531/
                    </a>
            </li>
            <li><audio id=sound_take_card_2 >
                    <source src="sounds/take_card/dersuperanton__taking-card.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">dersuperanton__taking-card.wav</span>
                    <a href="https://freesound.org/people/dersuperanton/sounds/434472/">
                    https://freesound.org/people/dersuperanton/sounds/434472/
                    </a>
            </li>
            <li><audio id=sound_take_card_3 >
                    <source src="sounds/take_card/paul-sinnett__card.wav"  type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">paul-sinnett__card.wav</span>
                    <a href="https://freesound.org/people/Paul%20Sinnett/sounds/404015/">
                    https://freesound.org/people/Paul%20Sinnett/sounds/404015/
                    </a>
            </li>
            <li><audio id=sound_take_card_4 >
                    <source src="sounds/take_card/themfish__slap-cards.wav" type="audio/wav">
                </audio>
                <span class="font_negrito mr-2">themfish__slap-cards.wav</span>
                    <a href="https://freesound.org/people/themfish/sounds/45821/">
                    https://freesound.org/people/themfish/sounds/45821/
                    </a>
            </li>
        </ul>
    </div>  */
}

function home_navbar() {
    $username = '';
    if (isset($_SESSION['user']['username'])) {
        $username = ': '.$_SESSION['user']['username'];
    }
    $texto = '
    <div class="container-fluid bg-dark">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Buraco Araucária</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="/buraco_php/">Home</a>
            <a class="nav-link" id=link_minhaconta>
                Minha Conta
                <span id=minhaContaUserName class=\"font_negrito text-primary\">
                '.$username.'
                </span>
            </a>
            <a class="nav-link">Sair</a>
            </div>
        </div>
        </div>
        </nav>
    </div>';
    return $texto;
}

function home_show(){
    $texto = home_header();
    $texto .= home_navbar();
    if (!isset($_SESSION['user'])) {
        $conteudo = users_login_form();
    } else {
        $dados['id_user'] = $_SESSION['user']['id_user'];
        $dados['username'] = $_SESSION['user']['username'];
        $dados['email'] = $_SESSION['user']['email'];
        $conteudo = users_home_page($dados);
    }
    $texto .= "<div id=area_principal>
                ".$conteudo."
                </div>
                ";
    echo($texto);

/*                
    $texto .= "<p class=mt-4>Session id: ".session_id()."</p>";
    $keys_session = array_keys($_SESSION)                ;
    for ($i=0; $i < count($keys_session); $i++) {
        $key = $keys_session[$i];
        $texto .= "<p> session key ".$key.": ".$_SESSION[$key]."</p>";
    }
    $texto .= home_footer();
    echo($texto);
    */
}


?>