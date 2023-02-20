let urlGetCards = "https://api-enigma-tempo.onrender.com/api/cards";

function loginPage(){
    document.getElementById("cadastrar").addEventListener("click", telaCadastro);
    document.getElementById("entrar").addEventListener("click", telaLogin);
}

function telaCadastro(){
    let login = document.getElementById("divLogin")
    let cadastro = document.getElementById("divCadastro")
    login.classList.add("d-none")
    cadastro.classList.remove("d-none")
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
    let data = getRequest(urlGetCards);
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

function createItem(element){
    let item = document.createElement("li");
    let input = document.createElement("input");
    input.type = 'radio';
    input.name = 'personalidade';
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

function getPersonalidades(){
    // let data = getRequest(urlGetPersonalidades);
    let data = {"personalidades":[{"_id":"63da7fe8f9327bb20ba5a76e","name":"Dom Pedro I"},{"_id":"63da7fe8f9327bb20ba5a76e","name":"Zumbi dos Palmares"}]}
    // data = JSON.parse(data);
    let personalidades = data['personalidades'];
    let lista = document.getElementById("listaPersonalidades");
    personalidades.forEach(element => {
        let personalidade = createItem(element);
        lista.appendChild(personalidade);
    });
    lista.innerHTML += '<li><input type="radio" class="btn-check" name="personalidade" id="personalidade1" autocomplete="off"><label class="btn btn-dark p-2" for="personalidade1"><img src="imagens/locked.png" alt="">Bloqueado</label></li>';
}

function gamePage(){
    document.getElementById("next").addEventListener("click", selectElements);
}

function selectElements(){
    let personalidade = document.querySelector('input[name="personalidade"]:checked').value;
    document.getElementById("personalidade").classList.add("d-none");
    document.getElementById("baralho").classList.remove("d-none");

}