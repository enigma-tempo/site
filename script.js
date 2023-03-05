const urlBase = 'https://api-enigma-tempo.onrender.com/api/';
let gameConfig = { id_jogador: '', id_personalidade: '', id_baralho: '', id_oponente: '' };

// import * as requests from 'request.js';

function telaCadastro() {
  let login = document.getElementById('divLogin');
  let cadastro = document.getElementById('divCadastro');
  login.classList.add('d-none');
  cadastro.classList.remove('d-none');
}

function telaLogin() {
  let login = document.getElementById('divLogin');
  let cadastro = document.getElementById('divCadastro');
  cadastro.classList.add('d-none');
  login.classList.remove('d-none');
}

function createItem(element, tipo) {
  let item = document.createElement('li');
  let input = document.createElement('input');
  input.type = 'radio';
  input.name = tipo;
  input.id = element._id;
  input.value = element._id;
  input.classList.add('btn-check');
  let label = document.createElement('label');
  label.htmlFor = element._id;
  label.classList.add('btn', 'btn-dark', 'p-2');
  let image = document.createElement('img');
  image.src = element.name.replace(' ', '-') + '.png';
  let name = document.createElement('p');
  name.innerText = element.name;
  label.appendChild(image);
  label.appendChild(name);
  label.appendChild(name);
  item.appendChild(input);
  item.appendChild(label);
  return item;
}

async function gamePage() {
  getPersonalidades();
  let proximo = document.getElementById('next');
  while (gameConfig['id_personalidade'] == '') {
    await setEscolha(proximo, 'personalidade');
  }
  getBaralho(gameConfig['id_personalidade']);
  while (gameConfig['id_baralho'] == '') {
    await setEscolha(proximo, 'baralho');
  }
  getOponente(gameConfig['id_personalidade']);
  while (gameConfig['id_oponente'] == '') {
    await setEscolha(proximo, 'oponente');
  }
  window.location.href = 'enigmatempo.html?id_jogador=' + gameConfig['id_jogador'] + '&id_personalidade=' + gameConfig['id_personalidade'] + '&id_baralho=' + gameConfig['id_baralho'] + '&id_oponente=' + gameConfig['id_oponente'];
}

async function setEscolha(proximo, tipo) {
  await buttonClick(proximo);
  let itemEscolhido = document.querySelector('input:checked');
  let alert_element = document.getElementById('alert');
  if (itemEscolhido != null) {
    alert_element.classList.add('d-none');
    itemEscolhido = itemEscolhido.value;
    gameConfig['id_' + tipo] = itemEscolhido;
    return new Promise((resolve) => {
      resolve(gameConfig['id_' + tipo]);
    });
  } else {
    alert_element.classList.remove('d-none');
  }
}

async function buttonClick(btn) {
  return new Promise((resolve) => (btn.onclick = () => resolve()));
}

function getPersonalidades() {
  // let data = getRequest(urlBase+"personalidades"); //getAllPersonalidades
  let data = {
    personalidades: [
      { _id: '1', name: 'Dom Pedro I' },
      { _id: '2', name: 'Zumbi dos Palmares' },
      { _id: '5', name: 'Zumbi dos Palmares' },
      { _id: '3', name: 'Zumbi dos Palmares' },
      { _id: '4', name: 'Zumbi dos Palmares' },
    ],
  };
  // data = JSON.parse(data);
  let personalidades = data['personalidades'];
  let lista = document.getElementById('lista');
  lista.innerHTML = '';
  let tipo = 'personalidade';
  personalidades.forEach((element) => {
    let personalidade = createItem(element, tipo);
    lista.appendChild(personalidade);
  });
  lista.innerHTML += '<li><input type="radio" class="btn-check" name="personalidade" id="locked" disabled><label class="btn btn-dark p-2" for="locked"><img src="imagens/locked.png" alt="">Bloqueado</label></li>';
}

function getBaralho(id_personalidade) {
  // let data = getRequest(urlBase+"deck/personalidade/"+id_personalidade); //getDeckByIdPersonalidade
  // data = JSON.parse(data);
  let data = {
    decks: [
      { _id: '1', name: 'Deck Principal' },
      { _id: '2', name: 'Deck secundário' },
    ],
  };
  let baralhos = data['decks'];
  document.getElementById('titulo').innerText = 'Selecione um baralho';
  let lista = document.getElementById('lista');
  lista.innerHTML = '';
  let tipo = 'baralho';
  baralhos.forEach((element) => {
    let baralho = createItem(element, tipo);
    lista.appendChild(baralho);
  });
  lista.innerHTML += '<li><button class="btn btn-dark p-2"><img src="imagens/create.png" alt=""><p>Criar</p></button></li>';
}

function getOponente(id_personalidade) {
  document.getElementById('titulo').innerText = 'Selecione um oponente';
  getPersonalidades();
  let player = document.getElementById(id_personalidade);
  player.disabled = true;
}

async function login() {
  let email = document.getElementById('username').value.toLowerCase();
  let password = document.getElementById('password').value;
  const loading = document.getElementById('loading');
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
  const loading = document.getElementById('loading');
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
        showAlert('alertRegister', 'success', 'Cadastro realizado com sucesso!', 'Entre na sua conta!');
        // sessionStorage.setItem('user', email);
        // window.location.href = 'index.html';
      } else {
        showAlert('alertRegister', 'danger', 'Erro!', 'Falha ao tentar cadastrar usuário.');
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

window.onload = function () {
  $(document).ready(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
  });
  if (sessionStorage.getItem('user') != null) {
    document.getElementById('jogar').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
    document.getElementById('logout').classList.remove('d-none');
  }
  let page_name = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  if (page_name == 'jogo.html') {
    gamePage();
  }
};

function logout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
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
