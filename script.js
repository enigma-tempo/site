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
    item.classList.add("card");
    let top = document.createElement("div");
    top.classList.add("d-flex", "flex-row", "justify-content-between", "cardTop");
    let id = document.createElement("span");
    let name = document.createElement("span");
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
    id.innerHTML = card.id;
    id.classList.add("d-none");
    params.innerHTML = card.params;
    params.classList.add("d-none");
    effect.innerHTML = card.effect;
    effect.classList.add("d-none");
    attack.innerHTML = card.attack;
    name.innerHTML = card.name;
    health.innerHTML = card.health;
    image.src = card.sprite;
    rarity.innerHTML = card.rarity;
    description.innerHTML = card.description;
    mana.innerHTML = card.mana;
    item.appendChild(id);
    item.appendChild(params);
    item.appendChild(effect);
    top.appendChild(attack);
    top.appendChild(name);
    top.appendChild(health);
    item.appendChild(top);
    item.appendChild(image);
    item.appendChild(rarity);
    item.appendChild(description);
    item.appendChild(mana);
    return item;
}

function getCards(){
    let data = getRequest("http://192.168.18.43/api-enigma-tempo/api/card/getAll");
    data = JSON.parse(data)
	let cards = data['dados']
    let lista = document.getElementById("listCards");
    console.log(cards);
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