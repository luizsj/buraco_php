function users_login_form(){
    let url = "index.php?fnajax=users_login_form";
    geral_ajax(url, 'area_principal', '', '');
}

function users_login_auth(){
    let url = "index.php?fnajax=users_login_auth";
    let dados = new Object();
    dados.email = document.getElementById('user_email').value;
    dados.password = document.getElementById('user_pass').value;
    let dados_post = JSON.stringify(dados);

    geral_ajax(url, 'area_principal', '', 'user_login_auth_reply_user_to_nav();', true, dados_post);
}

function user_login_auth_reply_user_to_nav() {
    //if login have success, will exist and hidden area with the username
    //that needs be replicated in the navbar
    if (document.getElementById('txt_username_base')){
        if (document.getElementById('minhaContaUserName')){
            document.getElementById('minhaContaUserName').innerHTML = document.getElementById('txt_username_base').innerHTML;
        }
    }
}

function users_new_form() {
    let url = "index.php?fnajax=users_new_form";
    geral_ajax(url, 'area_principal', '', '');
}

function users_new_save(){
    let url = "index.php?fnajax=users_new_save";
    let dados = new Object();
    dados.username = document.getElementById('user_name').value;
    dados.email = document.getElementById('user_email').value;
    dados.password = document.getElementById('user_pass').value;
    let dados_post = JSON.stringify(dados);
    geral_ajax(url, 'area_principal', '', '', true, dados_post);

}

function users_forgot_pass(){
    alert('falta implementar');
}

function users_forgot_pass_send(){
    alert('falta implementar');
}