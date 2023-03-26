if (sessionStorage.getItem('role') !== 'admin') {
    document.getElementById('criar_personalidade_btn').remove();
}

getHeroes();

async function getHeroes(){
    setTimeout(async function(){
        let data = await getRequest(urlBase+"heroes");
        if(data['message'] == 'Erro inesperado. Bad Request '){
            alert("Não foi possível conectar ao banco de dados... Tente novamente mais tarde");
            return false;
        }
        let heroes = data['heroes'];
        let lista = document.getElementById("listHeroes");
        heroes.forEach(element => {
            let hero = createHero(element);
            lista.appendChild(hero);
        });
        loading.classList.add('d-none');
    },500);
}

function createHero(hero){
    let item = document.createElement("li");
    item.classList.add("d-flex", "flex-column");
    let id = document.createElement("span");
    let name = document.createElement("p");
    name.classList.add("name");
    let description = document.createElement("p");
    description.classList.add("description","flex-grow-1");
    let image = document.createElement("img");
    id.innerHTML = hero._id;
    id.classList.add("d-none");
    name.innerHTML = hero.name;
    image.src = "imagens/"+hero.sprite;
    description.innerHTML = hero.description;
    item.appendChild(id);
    item.appendChild(image);
    item.appendChild(name);
    item.appendChild(description);
    return item;
}

