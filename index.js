function irPaginaCadastro(){
    let logado = JSON.parse(localStorage.getItem("logado"));
    if(logado == null){
        window.location.href = "cadastroUsuario.html"
        return;
    }
    localStorage.removeItem("carrinho")
    localStorage.removeItem("logado")
    document.getElementById("nomeLogado").innerHTML = `Entrar/Cadastrar-se`
    document.getElementById("mensagemUsuario").innerHTML = `CIA DO MEL`
    mostrarModal("VOLTE SEMPRE!!")
}
function checarLogado(){
    let logado = JSON.parse(localStorage.getItem("logado"));
    console.log(logado)
    if(logado != null){
        document.getElementById("nomeLogado").innerHTML = `${logado.login} / Deslogar`
        document.getElementById("mensagemUsuario").innerHTML = `OLÁ ${logado.login.toUpperCase()}!`
    }


}
checarLogado()
function irPaginaCatalogo(){
    window.location.href = "catalogo.html"

}

function mostrarModal(texto){
    document.getElementById("modalTexto").innerHTML=texto;
    document.getElementById("modal").style.display="flex"
  }
  
  function fecharModal(){
      document.getElementById("modal").style.display="none";
  }
  function abrirCarrinho(){
    document.getElementById("modalCarrinho").style.display="flex"
}
document.addEventListener("click", (evento)=>{
    if(evento.target==document.getElementById("modalCarrinho")){
        fecharCarrinho()
    }
})

function fecharCarrinho(){
    document.getElementById("modalCarrinho").style.display="none"
}
  function atualizarCarrinho(){
    let produtosCarrinho = JSON.parse(localStorage.getItem("carrinho"));
    if(produtosCarrinho){
        let totalPreco = 0;
        for(let produto of produtosCarrinho){
            totalPreco += produto.valor * produto.quantidade;
        }
        document.getElementById("total").innerText=`R$${totalPreco.toFixed(2)}`
        document.getElementById("totalCarrinho").innerText=`R$${totalPreco.toFixed(2)}`
        document.getElementById("meioCarrinho").innerHTML=" "
        for(i=0; i<produtosCarrinho.length; i++){
            let preco = Number(produtosCarrinho[i].valor).toFixed(2)
            document.getElementById("meioCarrinho").innerHTML+=`<div class="produtoCarrinho">
            <img src="${produtosCarrinho[i].foto}" alt="">
            <p>${produtosCarrinho[i].nome}</p>
            <p>R$${preco}</p>
            <p>${produtosCarrinho[i].quantidade}X</p>
            <svg onclick="removerProdutoCarrinho(${i})" xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" viewBox="0 0 24 24"><path fill="white" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"/></svg>
        </div>`
        }
    }
}
atualizarCarrinho()

function removerProdutoCarrinho(indice){
    let produtosCarrinho =JSON.parse(localStorage.getItem("carrinho"))
    produtosCarrinho.splice(indice,1)
    localStorage.setItem("carrinho",JSON.stringify(produtosCarrinho))
    atualizarCarrinho() 
}
  
