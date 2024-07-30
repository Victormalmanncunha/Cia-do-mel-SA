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
    let produtoSelecionado = inputNome.value 
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
for (i=0;i<produtos.length;i++){
    if (produtos[i].nome==produtoSelecionado){
        inputDescricao.value = produtos[i].descricao
        inputFoto.value = produtos[i].foto
        inputValor.value = produtos[i].valor
        encontrado = i
        mostrarModal(`${produtoSelecionado} selecionado`)

    }

}

}

function salvarEdicao (){
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos[encontrado].nome=inputNome.value
    produtos[encontrado].descricao=inputDescricao.value
    produtos[encontrado].foto=inputFoto.value
    produtos[encontrado].valor=inputValor.value
    localStorage.setItem("produtos",JSON.stringify(produtos))
    limparFormulario()
    mostrarModal("Alterado com Sucesso")
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
        }
    }
}

function mostrarModal(texto){
  document.getElementById("modalTexto").innerHTML=texto;
  document.getElementById("modal").style.display="flex"
}

function fecharModal(){
    document.getElementById("modal").style.display="none";
}



