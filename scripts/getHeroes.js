if (sessionStorage.getItem('role') !== 'admin') {
    document.getElementById('criar_personalidade_btn').remove();
}
var heros;
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
            heros = element;
            let hero = createHero(element);
            lista.appendChild(hero);
        });
        loading.classList.add('d-none');
    },500);
}

function createHero(hero){
    let li = document.createElement("li");
    li.classList.add("card-li");
    let item = document.createElement("div");
    item.classList.add("cards", "d-flex", "flex-column");
    let id = document.createElement("span");
    let name = document.createElement("p");
    name.classList.add("name");
    let image = document.createElement("img");
    let divclass = document.createElement("div");
    divclass.classList.add("d-flex", "flex-row", "justify-content-center");
    let classe = document.createElement("img");
    classe.classList.add("classesCard");
    classe.src = "imagens/"+hero.acting.name.toLowerCase()+".png";
    id.innerHTML = hero._id;
    id.classList.add("d-none");
    name.innerHTML = hero.name;
    image.style.backgroundImage  = "url('"+hero.sprite+"')";
    image.classList.add("imageCard");
    item.appendChild(id);
    item.appendChild(image);
    divclass.appendChild(classe);
    item.appendChild(divclass);
    item.appendChild(name);
    li.appendChild(item);
    if (sessionStorage.getItem('role') === 'admin' && window.location.href.split("/").pop()=="personalidades.html") {
        delete_btn = document.createElement("button");
        delete_btn.innerHTML = "<i class='bi bi-trash3-fill'></i>";
        delete_btn.classList.add("del_btn", "btn", "btn-danger");
        delete_btn.addEventListener('click',async function(){
            await deleteRequest(urlBase+"heroes/", hero._id).then(res =>{
                location.reload();
            });
        });
        li.appendChild(delete_btn);
    }
    return li;
}

