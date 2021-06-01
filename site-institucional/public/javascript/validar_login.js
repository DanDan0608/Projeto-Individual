
    let nick_usuario;
    let senha_usuario;
    let rota_usuario;

    function verificar_autenticacao() {
    nick_usuario = sessionStorage.nick_usuario_meuapp;
    senha_usuario = sessionStorage.senha_usuario_meuapp;
    rota_usuario = sessionStorage.fk_rota_meuapp;
    
    if (nick_usuario == undefined)  {
        redirecionar_login();
    } else {
        usuario_nome.innerHTML = nick_usuario;

        if(rota_usuario == undefined){

            console.log('Ta errado irmao');

        }else if(Number(rota_usuario) == 1){

            img_rota.src = `img/img-cadastro/top-icon.png`;

        }else if(Number(rota_usuario) == 2){

            img_rota.src =  `img/img-cadastro/mid-icon.png`;

        }else if(Number(rota_usuario) == 3){

            img_rota.src = `img/img-cadastro/jg-icon.png`;

        }else if(Number(rota_usuario) == 4){

            img_rota.src = `img/img-cadastro/bot-icon.png`;

        }else if(Number(rota_usuario) == 5){

            img_rota.src = `img/img-cadastro/sup-icon.png`;

        }

        validar_sessao();
    }
    
    }

    function redirecionar_login() {

    window.location.href = 'login.html';

    }

    function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${nick_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${nick_usuario}`, {cache:'no-store'}); 
}
