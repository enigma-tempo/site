const loading = document.getElementById('loading');
var login = document.getElementById('divLogin');
var cadastro = document.getElementById('divCadastro');
const urlBase = 'https://api-enigma-tempo.onrender.com/api/';

function telaCadastro() {
    login.classList.add('d-none');
    cadastro.classList.remove('d-none');
}
  
function telaLogin() {
    cadastro.classList.add('d-none');
    login.classList.remove('d-none');
}

async function login() {
    //trocar email para username
    let email = document.getElementById('username').value.toLowerCase();
    let password = document.getElementById('password').value;
    loading.classList.remove('d-none');
    if (username == '' || password == '') {
        showAlert('alertLogin', 'warning', 'Atenção!', 'Todos os campos são obrigatórios.');
    } else {
        let json = { email: email, password: password };
        setTimeout(async function () {
            let result = await postRequest(urlBase + 'login', json);
            console.log(result);
            console.log(result.responseText);
            loading.classList.add('d-none');
            if (result.status == 200) {
                showAlert('alertLogin', 'success', 'Login realizado com sucesso!', 'Você será redirecionado.');
                sessionStorage.setItem('user', email);
                window.location.href = 'index.html';
            } else {
                showAlert('alertLogin', 'danger', 'Erro!', 'Login ou senha incorretos.');
            }
        }, 400);
    }
}

function cadastro() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('usernameRegister').value.toLowerCase();
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('passwordRegister').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let erro = false;
    loading.classList.remove('d-none');
    if (name == '' || username == '' || password == '') {
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
        let json = { name: username, email: email, password: password, role: 'player' };
        setTimeout(async function () {
            let result = await postRequest(urlBase + 'register', json);
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

function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
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