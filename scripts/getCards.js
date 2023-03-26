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
    item.classList.add("cards", "d-flex", "flex-column",raritiesOptions[card.rarity._id]);
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
    let mana = document.createElement("span");
    mana.classList.add("cardAtrib", "mana");
    let effect = document.createElement("span");
    let description = document.createElement("p");
    description.classList.add("description","flex-grow-1");
    let params = document.createElement("span");
    let rarity = document.createElement("span");
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
    if (sessionStorage.getItem('role') === 'admin') {
        delete_btn = document.createElement("button");
        delete_btn.innerHTML = "<i class='bi bi-trash3-fill'></i>";
        delete_btn.classList.add("del_btn");
        delete_btn.classList.add("btn");
        delete_btn.classList.add("btn-danger");
        delete_btn.addEventListener('click',async function(){
            await deleteRequest(urlBase+"cards/", card._id).then(res =>{
                location.reload();
            });
        });
        // attack.classList.add('wDeleteBtn');
        // health.classList.add('wDeleteBtn');
        // category.classList.add('wDeleteBtn');
        li.appendChild(delete_btn);
    }
    return li;
}

