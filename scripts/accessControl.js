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
    if (firstName == '' || lastName == '' || username == '' || password == '') {
        showAlert('alertRegister', 'warning', 'Atenção!', 'Todos os campos são obrigatórios.');
        return false;
    }
    if (!validateEmail(email)) {
        showAlert('alertRegister', 'danger', 'Erro!', 'Email inválido.');
        return false;
    }
    if (confirmPassword !== password) {
        showAlert('alertRegister', 'danger', 'Erro!', 'As senhas não são iguais.');
        return false;
    }
    loading.classList.remove('d-none');
    let json = { name: firstName, last_name: lastName, username: username, email: email, password: password};
    setTimeout(async function () {
        let result = await postRequest(urlBase + 'register', json);
        let code = JSON.parse(result.responseText)['code'];
        loading.classList.add('d-none');
        if (code==1) {
            showAlert('alertRegister', 'danger', 'Erro!', 'Este nome de usuário já está em uso.');
            return false;
        }
        if (code==2) {
            showAlert('alertRegister', 'danger', 'Erro!', 'Este email já está em uso.');
            return false;
        }
        // console.log(result);
        // console.log(result.responseText);
        if (result.status == 201) {
            showAlert('alertRegister', 'success', 'Cadastro realizado com sucesso!', 'Redirecionando para a tela de Login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            showAlert('alertRegister', 'danger', 'Erro!', 'Falha ao tentar cadastrar usuário.');
        }
    }, 400);

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
            // console.log(result);
            // console.log(result.responseText);
            loading.classList.add('d-none');
            if (result.status == 200) {
                showAlert('alertLogin', 'success', 'Login realizado com sucesso!', 'Você será redirecionado.');
                sessionStorage.setItem('user', JSON.parse(result.responseText).user._id);
                sessionStorage.setItem('role', JSON.parse(result.responseText).user.role);
                sessionStorage.setItem('token', JSON.parse(result.responseText).token); //token para usar nas rotas bloqueadas. por enquanto tá de enfeite
                window.location.href = 'index.html';
            } else {
                showAlert('alertLogin', 'danger', 'Erro!', 'Login ou senha incorretos.');
            }
        }, 400);
    }
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

