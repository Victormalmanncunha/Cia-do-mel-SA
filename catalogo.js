function irPaginaCadastro(){
    let logado = JSON.parse(localStorage.getItem("logado"));
    if(logado == null){
        window.location.href = "cadastroUsuario.html"
        return;
    }
    localStorage.removeItem("logado")
    document.getElementById("nomeLogado").innerHTML = `Entrar/Cadastrar-se`
    document.getElementById("mensagemUsuario").innerHTML = `CIA DO MEL`
    alert("VOLTE SEMPRE!!")
    window.location.href = "index.html"
}
function checarLogado(){
    let logado = JSON.parse(localStorage.getItem("logado"));
    console.log(logado)
    if(logado != null){
        if(logado.login == 'ADM'){
            document.getElementById("cadastroProdutos").style.display ="block"
        }
        document.getElementById("nomeLogado").innerHTML = `${logado.login} / Deslogar`
        document.getElementById("mensagemUsuario").innerHTML = `OLÁ ${logado.login.toUpperCase()}!`
    }


}
checarLogado()
function irPaginaInicio(){
    window.location.href = "index.html"
}
function irPaginaProduto(){
    window.location.href = "cadastroProduto.html"
}
