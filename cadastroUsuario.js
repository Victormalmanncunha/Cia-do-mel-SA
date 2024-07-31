const campoLogin = document.getElementById("username");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("newusername");
const campoNovaSenha = document.getElementById("newpassword");
const campoRepSenha = document.getElementById("reppassword");

function irPaginaInicio(){
    window.location.href = "index.html"
}


function logar(){
    let login = campoLogin.value;
    let senha = campoSenha.value; 
    let mensagem = "Usuário ou senha incorreta!";
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (usuarios == null) {
    mensagem = "Nenhum usuário cadastrado até o momento";
} else {
    for (let usuario of usuarios) {
        if (usuario.login == login && usuario.senha == senha) {
            localStorage.setItem("logado", JSON.stringify(usuario));
            mensagem = "Logado com sucesso!!"
            localStorage.removeItem("carrinho")
            window.location.href = "index.html"
        }
    }
    
}
mostrarModal(mensagem)
}

function cadastrar(){
    if(campoNovoLogin.value != '' && campoNovaSenha.value != ''){
        if (campoNovaSenha.value == campoRepSenha.value) {

            const usuario = {
                login: campoNovoLogin.value,
                senha: campoNovaSenha.value
            };
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
            for(let verificado of usuarios){
                if(verificado.login == usuario.login){
                    return  mostrarModal("Esse login já foi cadastrado, realize um cadastro com nome diferente")
                }
            }
            
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            mostrarModal("Usuário cadastrado com sucesso!");   
            
        }else{
            mostrarModal("As senhas são diferentes!");
        }
    } else{
        mostrarModal("Preencha os campos obrigatórios.")
    }
        
}
function irPaginaCatalogo(){
    window.location.href = "catalogo.html"

}
function criarAdm(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    if(usuarios == null){
        usuarios =[]
        usuarios.push({login: 'ADM',
            senha: '2024'})
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
}
criarAdm()

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
