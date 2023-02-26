let urlBase = "https://api-enigma-tempo.onrender.com/api/";
let gameConfig = {"id_jogador":"","id_personalidade":"","id_baralho":"","id_oponente":""};
let playerLogin = "";

function telaCadastro(){
    let login = document.getElementById("divLogin");
    let cadastro = document.getElementById("divCadastro");
    login.classList.add("d-none");
    cadastro.classList.remove("d-none");
}

function telaLogin(){
    let login = document.getElementById("divLogin")
    let cadastro = document.getElementById("divCadastro")
    cadastro.classList.add("d-none")
    login.classList.remove("d-none")
}

function createCard(card){
    let item = document.createElement("li");
    item.classList.add("cards");
    let top = document.createElement("div");
    top.classList.add("d-flex", "flex-row", "justify-content-between");
    let id = document.createElement("span");
    let name = document.createElement("p");
    name.classList.add("name");
    let attack = document.createElement("div");
    attack.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib");
    let health = document.createElement("div");
    health.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib");
    let mana = document.createElement("div");
    mana.classList.add("cardAtrib", "mana");
    let effect = document.createElement("span");
    let description = document.createElement("p");
    description.classList.add("description");
    let params = document.createElement("span");
    let rarity = document.createElement("span");
    let image = document.createElement("img");
    id.innerHTML = card._id;
    id.classList.add("d-none");
    params.innerHTML = card.params;
    params.classList.add("d-none");
    effect.innerHTML = card.effect;
    effect.classList.add("d-none");
    attack.innerHTML = card.attack;
    name.innerHTML = card.name;
    health.innerHTML = card.health;
    image.src = card.sprite;
    // rarity.innerHTML = card.rarity;
    description.innerHTML = card.description;
    mana.innerHTML = card.mana;
    item.appendChild(id);
    item.appendChild(params);
    item.appendChild(effect);
    item.appendChild(mana);
    item.appendChild(image);
    item.appendChild(name);
    item.appendChild(description);
    item.appendChild(top);
    top.appendChild(attack);
    top.appendChild(health);
    // item.appendChild(rarity);
    return item;
}

function getCards(){
    let data = getRequest(urlBase+"cards");
    data = JSON.parse(data);
	let cards = data['cards'];
    let lista = document.getElementById("listCards");
    cards.forEach(element => {
        let card = createCard(element);
        lista.appendChild(card);
    });
}

function getRequest(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText
}

function postRequest(url,body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.send(body);
    return request.responseText
}

function createItem(element,tipo){
    let item = document.createElement("li");
    let input = document.createElement("input");
    input.type = 'radio';
    input.name = tipo;
    input.id = element._id;
    input.value = element._id;
    input.classList.add("btn-check");
    let label = document.createElement("label");
    label.htmlFor = element._id;
    label.classList.add("btn", "btn-dark", "p-2");
    let image = document.createElement("img");
    image.src = element.name.replace(' ', '-')+".png";
    let name = document.createElement("p");
    name.innerText = element.name;
    label.appendChild(image);
    label.appendChild(name);
    label.appendChild(name);
    item.appendChild(input);
    item.appendChild(label);
    return item;
}

async function gamePage(){
    getPersonalidades();
    let proximo = document.getElementById("next");
    while(gameConfig['id_personalidade'] == ""){
       await setEscolha(proximo,"personalidade");
    }
    getBaralho(gameConfig['id_personalidade']);
    while(gameConfig['id_baralho'] == ""){
        await setEscolha(proximo,"baralho");
    }
    getOponente(gameConfig['id_personalidade']);
    while(gameConfig['id_oponente'] == ""){
        await setEscolha(proximo,"oponente");
    }
    window.location.href = "enigmatempo.html?id_jogador="+gameConfig['id_jogador']+"&id_personalidade="
    +gameConfig['id_personalidade']+"&id_baralho="+gameConfig['id_baralho']+"&id_oponente="
    +gameConfig['id_oponente'];
}

async function setEscolha(proximo,tipo){
    await buttonClick(proximo);
    let itemEscolhido = document.querySelector('input:checked');
    let alert = document.getElementById("alert");
    if(itemEscolhido!=null){
        alert.classList.add("d-none");
        itemEscolhido=itemEscolhido.value;
        gameConfig['id_'+tipo] = itemEscolhido;
        return new Promise(resolve =>{resolve(gameConfig['id_'+tipo])});
    }else{
        alert.classList.remove("d-none");
    }
}

async function buttonClick(btn){
    return new Promise(resolve => btn.onclick=()=>resolve());
}

function getPersonalidades(){
// let data = getRequest(urlBase+"personalidades"); //getAllPersonalidades
    let data = {"personalidades":[{"_id":"1","name":"Dom Pedro I"},{"_id":"2","name":"Zumbi dos Palmares"},{"_id":"5","name":"Zumbi dos Palmares"},{"_id":"3","name":"Zumbi dos Palmares"},{"_id":"4","name":"Zumbi dos Palmares"}]}
    // data = JSON.parse(data);
    let personalidades = data['personalidades'];
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    let tipo = "personalidade";
    personalidades.forEach(element => {
        let personalidade = createItem(element,tipo);
        lista.appendChild(personalidade);
    });
    lista.innerHTML += '<li><input type="radio" class="btn-check" name="personalidade" id="locked" disabled><label class="btn btn-dark p-2" for="locked"><img src="imagens/locked.png" alt="">Bloqueado</label></li>';
}

function getBaralho(id_personalidade){
    // let data = getRequest(urlBase+"deck/personalidade/"+id_personalidade); //getDeckByIdPersonalidade
    // data = JSON.parse(data);
    let data = {"decks":[{"_id":"1","name":"Deck Principal"},{"_id":"2","name":"Deck secundário"}]}
    let baralhos = data['decks'];
    document.getElementById("titulo").innerText = "Selecione um baralho";
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    let tipo = "baralho";
    baralhos.forEach(element => {
        let baralho = createItem(element,tipo);
        lista.appendChild(baralho);
    });
    lista.innerHTML += '<li><button class="btn btn-dark p-2"><img src="imagens/create.png" alt=""><p>Criar</p></button></li>';
}

function getOponente(id_personalidade){
    document.getElementById("titulo").innerText = "Selecione um oponente";
    getPersonalidades();
    let player = document.getElementById(id_personalidade);
    player.disabled = true;
}
    
function login(){
    let username = document.getElementById("username").value.toLowerCase();
    let password = document.getElementById("password").value;
    // let json = {"username":username,"password":password};
    // let result = postRequest(urlBase+"login",json);
    // console.log(result);
    let alert = document.getElementById("alertLogin");
    if(username=="admin" && password=="admin"){
        alert.innerHTML = '<div id="successAlert" class="alert alert-success alert-dismissible fade show"><strong>Login realizado com sucesso!</strong> Você será redirecionado.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
        playerLogin = username;
        window.location.href = "index.html?username="+username;
    }else{
        if (username=="" || password=="") {
            alert.innerHTML = '<div id="warningAlert" class="alert alert-warning alert-dismissible fade show"><strong>Atenção!</strong> Todos os campos são obrigatórios.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';'<div id="errorAlert" class="alert alert-danger alert-dismissible fade show"><strong>Erro!</strong> Login ou senha incorretos.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
        }else{
            alert.innerHTML = '<div id="errorAlert" class="alert alert-danger alert-dismissible fade show"><strong>Erro!</strong> Login ou senha incorretos.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
        }
    }
}

function cadastro(){
    
}

function loginValidation(){
    if(window.location.search.slice(1).split("=")[1] != null){
        document.getElementById("jogar").classList.remove("d-none");
        document.getElementById("login").classList.add("d-none");
    }
}