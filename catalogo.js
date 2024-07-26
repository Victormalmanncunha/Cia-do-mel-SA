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

let produtos =  JSON.parse(localStorage.getItem("produtos")) || [] ;

function mostrarProdutos(){
    for (let produto of produtos){
        document.getElementById("produtos").innerHTML +=`<div class="produto"> <h2>${produto.nome}</h2><img src="${produto.foto}"><p>${produto.descricao}<br>R$${produto.valor}</p>                    <div>    
        <button><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>Adicionar ao carrinho</button>
        <input type="number" min="1" max="100">
    </div>`
    }
}
mostrarProdutos()

function pesquisar(){
let pesquisa = document.getElementById("pesquisar").value.toUpperCase()
let listaProdutos = []
for(let produto of produtos){
    if(produto.nome.toUpperCase().includes(pesquisa)){
        listaProdutos.push(produto)
    }
}
document.getElementById("produtos").innerHTML=""
for (let produto of listaProdutos){
    document.getElementById("produtos").innerHTML +=`<div class="produto"> <h2>${produto.nome}</h2><img src="${produto.foto}"><p>${produto.descricao}<br>R$${produto.valor}</p>                    <div>    
    <button><svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>Adicionar ao carrinho</button>
    <input type="number" min="1" max="100">
</div>`
}
document.getElementById("pesquisar").value=""
}

function abrirCarrinho(){
    document.getElementById("modalCarrinho").style.display="flex"
}
document.addEventListener("click", (evento)=>{
    console.log(evento.target)
    if(evento.target==document.getElementById("modalCarrinho")){
        fecharCarrinho()
    }
})

function fecharCarrinho(){
    document.getElementById("modalCarrinho").style.display="none"
}

