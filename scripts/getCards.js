if (sessionStorage.getItem('role') !== 'admin') {
    document.getElementById('criar_carta_btn').remove();
}

getCards();

async function getCards(){
    setTimeout(async function(){
        let data = await getRequest(urlBase+"cards");
        if(data['message'] == 'Erro inesperado. Bad Request '){
            alert("Não foi possível conectar ao banco de dados... Tente novamente mais tarde");
            return false;
        }
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
    let li = document.createElement("li");
    li.classList.add('card-li');
    let item = document.createElement("div");
    item.classList.add("cards", "d-flex", "flex-column", "clickable",raritiesOptions[card.rarity._id]);
    item.addEventListener('click', () => { showDetails(card) });
    let top = document.createElement("div");
    top.classList.add("d-flex", "flex-row", "justify-content-between");
    let id = document.createElement("span");
    let name = document.createElement("p");
    name.classList.add("name");
    let divclass = document.createElement("div");
    divclass.classList.add("d-flex", "flex-row", "justify-content-center");
    let classe = document.createElement("img");
    classe.classList.add("classesCard");
    classe.src = "imagens/"+card.acting.name.toLowerCase()+".png";
    let attack = document.createElement("div");
    attack.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib","attack");
    let health = document.createElement("div");
    health.classList.add("d-flex", "flex-row", "justify-content-center", "cardAtrib","health");
    let mana = document.createElement("div");
    mana.classList.add("cardAtrib", "mana","d-flex", "flex-row", "justify-content-center");
    let effect = document.createElement("span");
    let description = document.createElement("p");
    description.classList.add("description","flex-grow-1");
    let params = document.createElement("span");
    let image = document.createElement("div");
    let category = document.createElement('div');
    category.classList.add("d-flex", "flex-row", "justify-content-center", "align-items-center", "postura");
    category.innerHTML = card.category.name;
    id.innerHTML = card._id;
    id.classList.add("d-none");
    params.innerHTML = card.params;
    params.classList.add("d-none");
    effect.innerHTML = card.effect;
    effect.classList.add("d-none");
    attack.innerHTML = card.attack;
    name.innerHTML = card.name;
    health.innerHTML = card.health;
    image.style.backgroundImage  = "url('"+card.sprite+"')";
    image.classList.add("imageCard");
    description.innerHTML = card.description;
    mana.innerHTML = card.mana;
    let type = card.type.name;
    if(type=="Efeito"){
        top.classList.add("d-none");
    }
    item.appendChild(id);
    item.appendChild(params);
    item.appendChild(effect);
    item.appendChild(mana);
    item.appendChild(image);
    divclass.appendChild(classe);
    item.appendChild(divclass);
    item.appendChild(name);
    item.appendChild(description);
    item.appendChild(top);
    top.appendChild(attack);
    top.appendChild(category);
    top.appendChild(health);
    li.appendChild(item);
    if (sessionStorage.getItem('role') === 'admin' && window.location.href.split("/").pop()=="cartas.html") {
        delete_btn = document.createElement("button");
        delete_btn.innerHTML = "<i class='bi bi-trash3-fill'></i>";
        delete_btn.classList.add("del_btn", "btn", "btn-danger");
        delete_btn.addEventListener('click',async function(){
            await deleteRequest(urlBase+"cards/", card._id).then(res =>{
                location.reload();
            });
        });
        li.appendChild(delete_btn);
    }
    return li;
}
var details = document.getElementById("details");

function showDetails(card){
    let nome = document.getElementById("nameDetail");
    nome.innerHTML = card.name;
    let img = document.getElementById("imageDetail");
    img.style.backgroundImage  = "url('"+card.sprite+"')";
    let mana = document.getElementById("manaDetail");
    mana.innerHTML = card.mana;
    let attack = document.getElementById("attackDetail");
    attack.innerHTML = card.attack;
    let health = document.getElementById("healthDetail");
    health.innerHTML = card.health;
    let classe = document.getElementById("classDetail");
    classe.innerHTML = card.acting.name;
    let category = document.getElementById("categoryDetail");
    category.innerHTML = card.category.name;
    let description = document.getElementById("descriptionDetail");
    description.innerHTML = card.description;
    let context_game = document.getElementById("context_game");
    context_game.innerHTML = card.context_game;
    let context_history = document.getElementById("context_history");
    context_history.innerHTML = card.context_history;
    details.classList.remove("d-none");
}

function closeDetails(){
    details.classList.add("d-none");
}
