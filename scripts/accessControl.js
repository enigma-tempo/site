var loginDiv = document.getElementById('divLogin');
var cadastroDiv = document.getElementById('divCadastro');


function telaCadastro() {
    loginDiv.classList.add('d-none');
    cadastroDiv.classList.remove('d-none');
}

function telaLogin() {
    cadastroDiv.classList.add('d-none');
    loginDiv.classList.remove('d-none');
}

function cadastrar() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let username = document.getElementById('usernameRegister').value.toLowerCase();
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('passwordRegister').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let loading = document.getElementById('loadingRegister');
    let erro = false;
    if (firstName == '' || lastName == '' || username == '' || password == '') {
        erro = true;
        showAlert('alertRegister', 'warning', 'Atenção!', 'Todos os campos são obrigatórios.');
    }
    if (!validateEmail(email)) {
        erro = true;
        showAlert('alertRegister', 'danger', 'Erro!', 'Email inválido.');
    }
    if (confirmPassword !== password) {
        erro = true;
        showAlert('alertRegister', 'danger', 'Erro!', 'As senhas não são iguais.');
    }
    if (!erro) {
        loading.classList.remove('d-none');
        let json = { name: firstName, last_name: lastName, username: username, email: email, password: password, confirmpassword: confirmPassword};
        // let json = { name: firstName, last_name: lastName, username: username, email: email, password: password};
        setTimeout(async function () {
            let result = await postRequest(urlBase + 'register', json);
            let code = JSON.parse(result.responseText)['code'];
            if (code==1) {
                showAlert('alertRegister', 'danger', 'Erro!', 'Este nome de usuário já está em uso.');
                return false;
            }
            if (code==2) {
                showAlert('alertRegister', 'danger', 'Erro!', 'Este email já está em uso.');
                return false;
            }
            console.log(result);
            console.log(result.responseText);
            loading.classList.add('d-none');
            if (result.status == 201) {
                showAlert('alertRegister', 'success', 'Cadastro realizado com sucesso!', 'Redirecionando para a tela de Login...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, "1000");
            } else {
                showAlert('alertRegister', 'danger', 'Erro!', 'Falha ao tentar cadastrar usuário.');
            }
        }, 400);
    }

}

function login() {
    let username = document.getElementById('username').value.toLowerCase();
    let password = document.getElementById('password').value;
    let loading = document.getElementById('loading');
    loading.classList.remove('d-none');
    if (username == '' || password == '') {
        showAlert('alertLogin', 'warning', 'Atenção!', 'Todos os campos são obrigatórios.');
    } else {
        let json = { username: username, password: password };
        setTimeout(async function () {
            let result = await postRequest(urlBase + 'login', json);
            console.log(result);
            console.log(result.responseText);
            loading.classList.add('d-none');
            if (result.status == 200) {
                showAlert('alertLogin', 'success', 'Login realizado com sucesso!', 'Você será redirecionado.');
                sessionStorage.setItem('user', JSON.stringify(JSON.parse(result.responseText).user._id)); //trocar para id
                sessionStorage.setItem('token', JSON.parse(result.responseText).token); //token para usar nas rotas bloqueadas. por enquanto tá de enfeite
                window.location.href = 'index.html';
            } else {
                showAlert('alertLogin', 'danger', 'Erro!', 'Login ou senha incorretos.');
            }
        }, 400);
    }
}

function showAlert(id, tipo, titulo, mensagem) {
    let alert_element = document.getElementById(id);
    alert_element.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show"><strong>' + titulo + '</strong> ' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function mostrarSenha(item, button) {
    let olho = document.getElementById(button);
    let senha = document.getElementById(item);
    olho.addEventListener('mousedown', showPassword);
    olho.addEventListener('mouseup', hidePassword);
    olho.addEventListener('mouseout', function () {
        senha.type = 'password';
        olho.removeEventListener('mousedown', showPassword);
        olho.removeEventListener('mouseup', hidePassword);
    });
    function showPassword() {
        senha.type = 'text';
    }
    function hidePassword() {
        senha.type = 'password';
    }
}

document.getElementById("cadastroBtn").addEventListener("click",cadastrar);
