getCards();

async function getCards(){
    setTimeout(async function(){
        let data = await getRequest(urlBase+"cards");
        data = JSON.parse(data);
        let cards = data['cards'];
        let lista = document.getElementById("listCards");
        cards.forEach(element => {
            let card = createCard(element);
            lista.appendChild(card);
        });
        loading.classList.add('d-none');
    },500);
}

function createCard(card){
    let item = document.createElement("li");
    item.classList.add("cards", "d-flex", "flex-column");
    let top = document.createElement("div");
    top.classList.add("d-flex", "flex-row", "justify-content-between");
    let id = document.createElement("span");
    let name = document.createElement("p");
    name.classList.add("name");
    let attack = document.createElement("div");
    attack.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib","attack");
    let health = document.createElement("div");
    health.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib","health");
    let mana = document.createElement("span");
    mana.classList.add("cardAtrib", "mana");
    let effect = document.createElement("span");
    let description = document.createElement("p");
    description.classList.add("description","flex-grow-1");
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
    image.src = "imagens/"+card.sprite;
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