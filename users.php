<?php

include('users_components.php');
include('bd/users_bd.php');

function users_login_form($dados=[]) {
    $dados = users_form_prepare_dados($dados);
    $texto = '
    <div align=center>
    <div class="card p-2 m-3" style="max-width:400px;">
        <div class="card-body" id=area_form_login>
            <main class="form-signin">
                <form>
                <h1 class="h3 mb-3 fw-normal">Entrar</h1>
                '.users_component_email($dados['email']).'
                '.users_component_password($dados['password']).'
                '.users_component_alert($dados['alert']).'
                </form>
                <button class="w-75 btn btn-success m-3" onclick="users_login_auth();">
                    Entrar
                </button>

                <div class="row mt-3 font80">
                    <div class=col>
                        <button class="btn btn-sm btn-primary nowrap" onclick="users_new_form();">
                            Novo Cadastro
                        </button>
                    </div>
                '.users_component_forgot_password().'
                </div>
            </main>
        </div>
    </div>
    </div>
    ';
    return $texto;
}

function users_login_auth() {
    $dados = $_POST['dados_json'];
    $dados = json_decode($dados, true);
    //recuperar o hashed_password do email informado
    //se retornar '' é porque não existe o email
    $hashed_password = users_bd_get_hashed_password($dados['email']);
    $verify = password_verify($dados['password'], $hashed_password);
    if (!$verify) {
        $dados['alert'] = 'Email e/ou senha inválidos!';
        $text = users_login_form($dados);
    } else {
        //completar o array com id_user e user_name
        $dados = users_bd_login_get_dados($dados);
        $text = users_home_page($dados);
    }
    return $text;

}

function users_form_prepare_dados($dados) {
    if (count($dados) == 0) {
        $dados['email'] = '';
        $dados['username'] = '';
        $dados['password'] = '';
        $dados['alert'] = '';
    }
    return $dados;
}
function users_new_form($dados=[]) {
    $dados = users_form_prepare_dados($dados);

    $texto = '
    <div align=center>
    <div class="card p-2 m-3" style="max-width:400px;">    
        <div class="card-body">
            <main class="form-new-user">
                <form>
                <h1 class="h3 mb-3 fw-normal">Novo Usuário</h1>
                <div class="form-floating">
                    <input type="text" class="form-control" id="user_name" max-length=15
                        value="'.$dados['username'].'" required>
                    <label for="user_name">Nome de Usuário</label>
                </div>
                '.users_component_email($dados['email']).'
                '.users_component_password($dados['password']).'
                '.users_component_alert($dados['alert']).'
                <button class="w-75 btn btn-success m-3" onclick="users_new_save();">
                    Cadastrar
                </button>
                </form>
                <div class="row mt-3 font80">
                    <div class=col>
                        <button class="btn btn-sm btn-primary nowrap" onclick="users_login_form();">
                            Voltar para Login
                        </button>
                    </div>
                '.users_component_forgot_password().'
                </div>
            </main>
        </div>
    </div>
    </div>
    ';
    return $texto;
}

function users_new_save() {
    $dados = $_POST['dados_json'];
    $dados = json_decode($dados, true);
    //checar se já existe username ou email
    if (users_bd_check_exist($dados)) {
        $dados['alert'] = 'Usuário e/ou email já existem!';
        $text = users_new_form($dados);
    } else {
        $id_user = users_bd_new_save($dados);
        if ($id_user) {
            //usuário cadastrado e este é o id do cadastro
            $dados['id_user'] = $id_user;
            $text = users_home_page($dados);
        } else {
            $dados['alert'] = 'Não foi possível salvar o cadastro!';
            $text = users_new_form($dados);
        }
    }
    return $text;
}

function users_home_page($dados){
    $_SESSION['user']['id_user'] = $dados['id_user'];
    $_SESSION['user']['username'] = $dados['username'];
    $_SESSION['user']['email'] = $dados['email'];
    $text = '
            <h1 class=bg-primary>Bem-vindo '.$_SESSION['user']['username'].'!</h1>
            <div class="container text-justify">
            <div class="row">
                <div class="col m-1 border shadow p-3 bg-body rounded" style="min-width: 200px; max-width:300px;" id=user_new_game>
                '.user_component_new_game().'
                </div>
                <div class="col m-1 border shadow p-3 bg-body rounded" style="min-width: 300px; max-width:500px;" id=user_ranking>
                '.user_component_ranking().'
                </div>
                <div class="col m-1 border shadow p-3 bg-body rounded" style="min-width: 300px; max-width:500px;" id=user_last_games>
                '.user_component_last_games().'
                </div>
            </div>
            </div>
            <span class=display_hidden id=txt_username_base>'.$_SESSION['user']['username'].'</span>';
    return $text;
}


?>