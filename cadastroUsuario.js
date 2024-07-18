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
            window.location.href = "index.html"
        }
    }
    
}
alert(mensagem)
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
                    return alert("Esse login já foi cadastrado, realize um cadastro com nome diferente")
                }
            }
            
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Usuário cadastrado com sucesso!");   
            
        }else{
            alert("As senhas são diferentes!");
        }
    } else{
        alert("Preencha os campos obrigatórios.")
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
