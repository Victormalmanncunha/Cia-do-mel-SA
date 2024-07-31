function irPaginaCadastro(){
    let logado = JSON.parse(localStorage.getItem("logado"));
    if(logado == null){
        window.location.href = "cadastroUsuario.html"
        return;
    }
    localStorage.removeItem("logado")
    localStorage.removeItem("carrinho")
    document.getElementById("nomeLogado").innerHTML = `Entrar/Cadastrar-se`
    document.getElementById("mensagemUsuario").innerHTML = `CIA DO MEL`
    mostrarModal("VOLTE SEMPRE!!")
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

let produtos =  JSON.parse(localStorage.getItem("produtos")) || [] ;

function mostrarProdutos(){
    for (i=0; i<produtos.length; i++){
        document.getElementById("produtos").innerHTML +=`<div class="produto"> <h2>${produtos[i].nome}</h2><img src="${produtos[i].foto}"><p>${produtos[i].descricao}<br>R$${produtos[i].valor}</p>                    <div>    
        <button onclick="adicionarProduto(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>Adicionar ao carrinho</button>
        <input id="inputQuantidade${produtos[i].nome}" class="inputQuantidade" type="number" min="1" max="100" value="1">
    </div>`
    }
}
mostrarProdutos()

function pesquisar(){
let pesquisa = document.getElementById("pesquisar").value.toUpperCase()
document.getElementById("produtos").innerHTML=""

for(i=0; i<produtos.length; i++){
    if(produtos[i].nome.toUpperCase().includes(pesquisa)){
        document.getElementById("produtos").innerHTML +=`<div class="produto"> <h2>${produtos[i].nome}</h2><img src="${produtos[i].foto}"><p>${produtos[i].descricao}<br>R$${produtos[i].valor}</p>                    <div>    
        <button onclick="adicionarProduto(${i}) "><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>Adicionar ao carrinho</button>
        <input id="inputQuantidade${produtos[i].nome}" class="inputQuantidade" type="number" min="1" max="100">
    </div>`    
    }
}

document.getElementById("pesquisar").value=""
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

function adicionarProduto(indice){
let produtosCarrinho = JSON.parse(localStorage.getItem("carrinho"));
let produtoAdicionado
if(produtosCarrinho){
    for(let produto of produtosCarrinho){
        if(produtos[indice].nome==produto.nome){
            console.log(produto);
            produto.quantidade+=Number(document.getElementById(`inputQuantidade${produto.nome}`).value);
            localStorage.setItem("carrinho", JSON.stringify(produtosCarrinho));
            atualizarCarrinho()
            return;
        }
    }
    produtoAdicionado = produtos[indice];
    produtoAdicionado.quantidade = Number(document.getElementById(`inputQuantidade${produtoAdicionado.nome}`).value);
    produtosCarrinho.push(produtoAdicionado)
    localStorage.setItem("carrinho", JSON.stringify(produtosCarrinho));
}else{
    produtosCarrinho = []
    produtoAdicionado = produtos[indice];
    produtoAdicionado.quantidade = Number(document.getElementById(`inputQuantidade${produtoAdicionado.nome}`).value);
    produtosCarrinho.push(produtoAdicionado)
    localStorage.setItem("carrinho", JSON.stringify(produtosCarrinho));
}
atualizarCarrinho()
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

function mostrarModal(texto){
    document.getElementById("modalTexto").innerHTML=texto;
    document.getElementById("modal").style.display="flex"
  }
  
  function fecharModal(){
      document.getElementById("modal").style.display="none";
  }
  
