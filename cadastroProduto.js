const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("descricao");
const inputFoto = document.getElementById("foto");
const inputValor = document.getElementById("valor");
let  encontrado = -1;


function paginaInicio(){
    window.location.href = "index.html"
}
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
        document.getElementById("nomeLogado").innerHTML = `${logado.login} / Deslogar`
        document.getElementById("mensagemUsuario").innerHTML = `OLÁ ${logado.login.toUpperCase()}!`
    }


}
checarLogado()
function irPaginaCatalogo(){
    window.location.href = "catalogo.html"

}

function cadastrarProduto(){
    let nome = inputNome.value;
    let descricao = inputDescricao.value;
    let foto = inputFoto.value;
    let valor = inputValor.value;
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if(nome == "" || descricao == "" || foto == "" ||valor == "" ){
        mostrarModal ("Preencha todos os campos")
    }else {
        for( let produto of produtos){
            if (produto.nome == nome){
                mostrarModal("Produto ja cadastrado")
                return;
            }

        } 
        if(typeof Number(valor) == NaN){
            mostrarModal("Digite um valor válido");
            return;
        }
        let produto =  {
            nome:nome, 
            descricao:descricao,
            foto:foto,
            valor:Number(valor)

        } 
        produtos.push(produto)
         localStorage.setItem("produtos", JSON.stringify(produtos)) 
         mostrarModal("Produto Cadastrado com Sucesso")
         limparFormulario()
    } 
    
}

function editarProduto(){
    if(inputNome.value == ''){
        mostrarModal("Digite o nome do produto.")
    }
    let produtoSelecionado = inputNome.value 
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
for (i=0;i<produtos.length;i++){
    if (produtos[i].nome==produtoSelecionado){
        inputDescricao.value = produtos[i].descricao
        inputFoto.value = produtos[i].foto
        inputValor.value = produtos[i].valor
        encontrado = i
        mostrarModal(`${produtoSelecionado} selecionado`)
        return
    }

}
mostrarModal("Produto não encontrado.")
}

function salvarEdicao (){
    if(encontrado == -1){
        mostrarModal("Selecione o produto a ser editado.")
        return
    }
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos[encontrado].nome=inputNome.value
    produtos[encontrado].descricao=inputDescricao.value
    produtos[encontrado].foto=inputFoto.value
    produtos[encontrado].valor=inputValor.value
    localStorage.setItem("produtos",JSON.stringify(produtos))
    limparFormulario()
    mostrarModal("Alterado com Sucesso")
    encontrado = -1
}

function limparFormulario(){
    inputNome.value = ""
    inputDescricao.value =""
    inputFoto.value = ""
    inputValor.value = ""
}

function excluirProduto(){
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    for (let i = 0; i<produtos.length; i++){
        if(produtos[i].nome==inputNome.value){
            produtos.splice(i,1)
            mostrarModal(`${inputNome.value} Excluido com Sucesso`)
            localStorage.setItem("produtos", JSON.stringify(produtos))
            limparFormulario()
            return
        }
    }
    mostrarModal("Digite o nome do produto.")
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
